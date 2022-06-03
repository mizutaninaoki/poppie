from django.db import models
from .exchanged_item import ExchangedItem


class ExchangedItemLog(models.Model):
    exchanged_item = models.ForeignKey(
        ExchangedItem, verbose_name="景品交換履歴", on_delete=models.CASCADE
    )
    quantity = models.IntegerField("交換した数", blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "exchanged_item_log"

    def __str__(self):
        return f"id: {self.id}, exchanged_item_id: {self.exchanged_item_id}, quantity: {self.quantity}, created_at: {self.created_at}, updated_at: {self.updated_at}"
