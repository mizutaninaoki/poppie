from django.db import models
from .company import Company
from .account import Account


class Dealing(models.Model):
    company = models.ForeignKey(Company, verbose_name="会社", on_delete=models.CASCADE)
    giver = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="giver")
    receiver = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name="receiver"
    )
    amount = models.IntegerField("取引したポイント", blank=False, null=False)
    message = models.TextField("贈与する相手へのメッセージ", blank=True, null=True, max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "dealings"

    def __str__(self):
        return f"{self.giver.name} -> {self.receiver.name}の取引"
