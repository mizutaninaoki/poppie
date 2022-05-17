from django.db import models
from .company import Company
from .item import Item


class Stock(models.Model):
    company = models.ForeignKey(Company, verbose_name="会社", on_delete=models.CASCADE)
    item = models.ForeignKey(Item, verbose_name="景品", on_delete=models.CASCADE)
    isExchanged = models.BooleanField("交換済かどうか", blank=False, null=False, default=False)
    exchanged_at = models.DateTimeField("交換した時間", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "stocks"

    def __str__(self):
        return f"{self.item.name}: {self.exchanged_at if self.isExchanged else 'not exchanded'}"
