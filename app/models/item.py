from django.db import models
from .company import Company


class Item(models.Model):
    company = models.ForeignKey(Company, verbose_name="会社", on_delete=models.CASCADE)
    name = models.CharField("景品名", max_length=30, blank=False, null=False)
    exchangable_point = models.IntegerField("交換に必要なポイント", blank=False, null=False)
    # image = models.ImageField(upload_to='images', verbose_name='景品画像', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "items"

    def __str__(self):
        return self.name
