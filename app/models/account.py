from django.db import models
from django.conf import settings
from .company import Company


class Account(models.Model):
    company = models.ForeignKey(Company, verbose_name="会社", on_delete=models.CASCADE)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, related_name="account", on_delete=models.CASCADE
    )
    givable_point = models.IntegerField("贈与可能ポイント", blank=False, null=False, default=0)
    received_point = models.IntegerField(
        "受け取ったポイント", blank=False, null=False, default=0
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "accounts"

    def __str__(self):
        return f"{self.user.id}: {self.user.name}のAccount"
