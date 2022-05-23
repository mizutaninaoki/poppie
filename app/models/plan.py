from django.db import models


class Plan(models.Model):
    name = models.CharField("プラン名", max_length=30, blank=False, null=False)
    fee = models.IntegerField("月額利用料金", blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "plans"
        ordering = ["id"]

    def __str__(self):
        return f"ID: {self.id}のPlan(name: {self.name})"
