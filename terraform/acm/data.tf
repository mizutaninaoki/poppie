#------------------------------------------
# data(terraformで定義していないAWSのリソース)
# (Data Source はTerraform外（State外）で定義したリソースをTerraform内で参照可能にする機能です。)
# お名前comで取得したドメインを使用する場合、お名前comにRoute53のネームサーバをNSレコードに反映させる必要がある。
# 参照：https://qiita.com/m-oka-system/items/34f3ac3d98210d06dbc8
#     https://dev.classmethod.jp/articles/route53-domain-onamae/
#------------------------------------------
data "aws_route53_zone" "public" { # Route53で独自ドメインを取得した場合、すでにホストゾーンは作成されているため、dataを使用する
  name         = var.domain      # 作成するパブリックホストゾーンの名前
  private_zone = false
}
