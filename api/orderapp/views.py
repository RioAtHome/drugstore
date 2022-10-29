from .serializers import OrderSerializer
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateAPIView,
    get_object_or_404,
    ListAPIView,
    GenericAPIView,
    DestroyAPIView,
)
from .models import Order, User
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
import csv
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_filters import rest_framework as filters
from .filters import OrderFilter
from drug_app.serializers import DrugSerializer


class AbstractView(GenericAPIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = OrderFilter
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]


class ListCreateOrder(AbstractView, ListCreateAPIView):
    def get_pharmacy(self):
        code = self.request.resolver_match.kwargs.get("code")
        pharmacy = User.objects.get(code=code)
        return pharmacy

    def filter_queryset(self, queryset):
        pharmacy = self.get_pharmacy()
        queryset = queryset.filter(user=pharmacy)
        status = self.request.query_params.getlist("status")

        if status:
            queryset = queryset.filter(status__in=status)

        return queryset

    def create(self, request, *args, **kwargs):
        if request.user != self.get_pharmacy():
            return Response({"message": "cannot create order for another user"})
        print(request.data)
        return super().create(request, *args, **kwargs)


class ListOrders(AbstractView, ListAPIView):
    pass


class ExtractOrders(ListOrders):

    def get_serializer(self, queryset, many=True):
        return self.serializer_class(
            queryset,
            many=many,
        )

    def list(self, request, *args, **kwargs):
        if not request.user.is_staff:
            return Response({"message": "only admin can extract data"})

        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = 'attachment; filename="export.csv"'

        serializer = self.get_serializer(
            self.get_queryset(),
        )

        headers = OrderSerializer.Meta.fields
        # TODO: Write a better csv structure
        writer = csv.DictWriter(response, fieldnames=headers)
        writer.writeheader()
        for order in serializer.data:
            writer.writerow(order)


        return response


class ModifyOrder(RetrieveUpdateAPIView, AbstractView, DestroyAPIView):
    def get_pharmacy(self):
        code = self.request.resolver_match.kwargs.get("code")
        pharmacy = get_object_or_404(User, code=code)
        print(pharmacy)
        return pharmacy

    def get_object(self):
        order_id = self.request.resolver_match.kwargs.get("order_id")
        order = get_object_or_404(Order, id=order_id, user=self.get_pharmacy())
        return order

    def get(self, request, *args, **kwargs):
        print(request.user, "user")
        if self.get_pharmacy() != request.user or not request.user.is_staff:
            return Response({"message": "cannot get another pharmacy orders"})
        return super().get(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        if self.get_pharmacy() != request.user:
            return Response({"message": "cannot update another pharmacy orders"})
        if self.get_object().status != "PE":
            return Response({"message": "can update when order is pinned"})
        return super().update(request, *args, **kwargs)


class StatusOrderView(AbstractView, APIView):
    def patch(self, request, order_id):
        if not request.user.is_staff:
            return Response("only admin can complete status")
        order = get_object_or_404(Order, id=order_id)
        print("request.user")
        status = request.data.get("status", "")
        if not status:
            return Response({"message": "must put status in filed"})
        if order.status != "PE":
            return Response({"message": "cannot change if status is not pinned"})
        if status not in ["CO", "CA"]:
            return Response(
                {
                    "message": 'change status can only be with "CO" or "CA" characters to be completed'
                }
            )
        order.status = status
        order.save()
        return Response("the state is changed successfully")



class BatchOrderStatusView(AbstractView, RetrieveUpdateAPIView):
    def patch(self, request, *args, **kwargs):

        if not request.user.is_staff:
                return Response("only admin can complete status", status=401)

        for order in request.data:
            __order = get_object_or_404(Order, id=order['id'])
            __order.status = order['status']
            __order.save()

        return Response("done", status=200)


