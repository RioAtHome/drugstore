from .serializers import DrugSerializer
from .models import Drug
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateAPIView,
    get_object_or_404,
    GenericAPIView,
)
from rest_framework.response import Response
from .store_csv import CSVFiles
import csv, os
from .filters import DrugFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from orderapp.models import Order
from rest_framework import status


def uploaded_file_to_dict(file):
    dict_list = []
    readable_file = file.read().decode().splitlines()
    csv_file = csv.DictReader(readable_file)

    for row in csv_file:
        cleaned_row = {k: v for k, v in row.items() if v}
        dict_list.append(cleaned_row)

    return dict_list


class AbstractView(GenericAPIView):
    serializer_class = DrugSerializer
    queryset = Drug.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]


class ListCreateDrugView(AbstractView, ListCreateAPIView):

    filter_backends = [DjangoFilterBackend]
    filterset_class = DrugFilter

    def create(self, request, *args, **kwargs):
        if not request.user.is_staff:
            return Response({"message": "this user is not admin"})
        file = request.FILES['file']
        ext = file.name.split('.')[-1]
        if not ext in ['csv']:
            return Response("Bad Extension", status=status.HTTP_400_BAD_REQUEST)
        drugs = uploaded_file_to_dict(file)
        if not drugs:
            return Response("Bad Syntax", status=status.HTTP_400_BAD_REQUEST)

        serializer = DrugSerializer(data=drugs, many=True)
        valid = serializer.is_valid()
        for error in serializer.errors:
            name = error.get('name', None)
            if not name:
                continue
            if error['name'][0].code != "unique":
                return Response("Bad Syntax", status=status.HTTP_400_BAD_REQUEST)
        self.queryset.delete()
        print(self.queryset)
        serializer = DrugSerializer(data=drugs, many=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

        return Response("A-Okay", status=status.HTTP_201_CREATED)
    def list(self, request, *args, **kwargs):

        if request.query_params.get('no_pag', False) == 'true':
            self.pagination_class = None

        return super().list(request, *args, **kwargs)


class OneDrugView(AbstractView, RetrieveUpdateAPIView):
    def get_object(self):
        drug_id = self.kwargs["drug_id"]
        drug = get_object_or_404(Drug, pk=drug_id)
        return drug

    def update(self, request, *args, **kwargs):
        if request.user.is_staff:
            return super().update(request, *args, **kwargs)
        return Response({"message": "this user is not admin"})



