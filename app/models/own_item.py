from django.db import models
from account.models import User
from .item import Item

#
# 交換予約待ちの景品（会社側が実際に景品を渡したらレコードを削除する） -> TODO: テーブル名をExchangeBookedItem変更する
#
class OwnItem(models.Model):
    user = models.ForeignKey(User, verbose_name="ユーザー", on_delete=models.CASCADE)
    item = models.ForeignKey(Item, verbose_name="景品", on_delete=models.CASCADE)
    quantity = models.IntegerField("保持している数", blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "own_item"

    def __str__(self):
        return f"id: {self.id}, user_id: {self.user_id}, item_id: {self.item_id}, quantity: {self.quantity}, created_at: {self.created_at}, updated_at: {self.updated_at}"
