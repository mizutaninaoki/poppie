from django.db import models
from .own_item import OwnItem


class ExchangedItemLog(models.Model):
    own_item = models.ForeignKey(
        OwnItem, verbose_name="景品交換履歴", on_delete=models.CASCADE
    )
    quantity = models.IntegerField("交換した数", blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "exchanged_item_log"

    def __str__(self):
        return f"id: {self.id}, own_id: {self.own_id}, quantity: {self.quantity}, created_at: {self.created_at}, updated_at: {self.updated_at}"
