from django.db import models
from .company import Company
from .account import Account


class DistributeLog(models.Model):
    company = models.ForeignKey(Company, verbose_name="会社", on_delete=models.CASCADE)
    account = models.ForeignKey(Account, verbose_name="アカウント", on_delete=models.CASCADE)
    point = models.IntegerField("配布したポイント", blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "distribute_logs"

    def __str__(self):
        return f"ID: {self.id}のDistributionLog"
