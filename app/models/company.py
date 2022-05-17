from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from .plan import Plan


class Company(models.Model):
    plan = models.ForeignKey(Plan, verbose_name="プラン", on_delete=models.PROTECT)
    name = models.CharField("会社名", max_length=30, blank=False, null=False)
    email = models.EmailField(
        "メールアドレス", max_length=254, unique=True, blank=False, null=False
    )
    # https://stackoverflow.com/questions/19130942/whats-the-best-way-to-store-phone-number-in-django-models
    tel = PhoneNumberField(unique=True, null=True, blank=True)
    point = models.IntegerField("会社が配布可能なポイント", default=0, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "companies"

    def __str__(self):
        return self.name
