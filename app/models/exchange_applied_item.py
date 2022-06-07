from django.db import models
from account.models import User
from .item import Item


class ExchangeAppliedItem(models.Model):
    user = models.ForeignKey(User, verbose_name="ユーザー", on_delete=models.CASCADE)
    item = models.ForeignKey(Item, verbose_name="景品", on_delete=models.CASCADE)
    quantity = models.IntegerField("保持している数", blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "exchange_applied_items"

    def __str__(self):
        return f"id: {self.id}, user_id: {self.user_id}, item_id: {self.item_id}, quantity: {self.quantity}, created_at: {self.created_at}, updated_at: {self.updated_at}"
