from django.db import models
from .company import Company


class PurchasedPointLog(models.Model):
    company = models.ForeignKey(Company, verbose_name="会社", on_delete=models.CASCADE)
    point = models.IntegerField("会社が購入したポイント", blank=False, null=False)
    price = models.IntegerField("会社が購入したポイントの金額", blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "purchased_point_logs"

    def __str__(self):
        return f"id: {self.id}, point: {self.point}, point: {self.price}"
