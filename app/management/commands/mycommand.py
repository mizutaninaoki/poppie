from django.core.management.base import BaseCommand
from django.core.management import call_command

# カスタムコマンド
class Command(BaseCommand):
    # Commandクラスの変数helpはpython manage.py help カスタムコマンド名としたときに表示される説明文的なもの
    help = "テストコマンド"

    # handleメソッド内に実行した処理を書く
    def handle(self, *args, **options):
        call_command(
            "graphql_schema", schema="account.schema.schema", out="schema.graphql"
        )
        print("Hello World!")


# ./manage.py graphql_schema --schema tutorial.quickstart.schema --out schema.graphql

# management.call_command('mycommand', 'mydata', myopt=2)
