from orderapp.models import Order
from django_filters import rest_framework as filters

class OrderFilter(filters.FilterSet):
    drugName = filters.CharFilter(field_name='ordered_drugs__name')
    created_at = filters.DateFilter(field_name='created_at')
    status = filters.MultipleChoiceFilter(choices=(("PE", "Pending"),
        ("CO", "Completed"),
        ("RE", "Rejected"),
        ("CA", "Canceled"),)
    )
    pharmacyName = filters.CharFilter(field_name='user__name')
    class Meta:
        model = Order
        fields = ('user',)