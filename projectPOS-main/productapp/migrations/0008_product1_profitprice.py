# Generated by Django 5.1.4 on 2025-01-20 11:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productapp', '0007_remove_sale_product_delete_product2_delete_sale'),
    ]

    operations = [
        migrations.AddField(
            model_name='product1',
            name='profitprice',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
            preserve_default=False,
        ),
    ]
