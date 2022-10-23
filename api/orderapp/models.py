from telnetlib import STATUS
from django.db import models
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
from drug_app.models import Drug, AbstractDrug
from drug_app.validators import name_validator
from rest_framework.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.db.models import CheckConstraint, Q


User = get_user_model()


class Order(models.Model):
    STATUS = (
        ("PE", "Pending"),
        ("CO", "Completed"),
        ("RE", "Rejected"),
        ("CA", "Canceled"),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    status = models.CharField(default=STATUS[0][0], choices=STATUS, max_length=2)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False, blank=True)
    updated_at = models.DateTimeField(auto_now=True, editable=False, blank=True)
    
    class Meta:
        ordering = ["created_at"]

    @property
    def total_price(self):
        total_price = 0
        for drug in self.ordered_drugs.all():
            total_price += float(drug.total_drug_price)
        return total_price


class OrderedDrug(AbstractDrug):

    name = models.CharField(max_length=50, validators=[name_validator])
    origindrug = models.ForeignKey(
        Drug, null=True, related_name="origin_drug", on_delete=models.SET_NULL
    )
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name="ordered_drugs"
    )

    class Meta:
        unique_together = ["order", "name"]

    def validate_unique(self, exclude=[]) -> None:
        try:
            return super().validate_unique(exclude)
        except:
            raise ValidationError("cannot add the drug in the same order more than one")

    @property
    def total_drug_price(self):
        return "%.2f" % (float(self.drug_price) * int(self.quantity))

    def clean(self):
        if self.quantity < 1:
            raise ValidationError("The quantity must be above or equal 1")

        if self.quantity > self.origindrug.quantity:
            raise ValidationError(
                _(f"Please add quantity value lower than {self.origindrug.quantity}")
            )

    def save(
        self, force_insert: bool = False, force_update: bool = False, using=None
    ) -> None:
        self.full_clean()
        return super().save(force_insert, force_update)
