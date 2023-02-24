#---------------------------------------------------
# data (Route53に登録したpoppie.siteのホストゾーンを取得)(すでに手動でroute53のホストゾーンを作成している場合）
#---------------------------------------------------
data "aws_route53_zone" "public" {
  name         = var.domain
  private_zone = false # パブリックホストゾーン指定
}


#--------------------------------------------------------------
# Route53のパブリックホストゾーンを作成(terraformでホストゾーンを作成する場合。お名前comのドメインを使用する場合、terraform destroyするたびに、お名前comでネームサーバーを登録して30分程度待つ必要があるため、ホストゾーンだけ手動で作成して、terraformで管理しない方が、メンテナンスしやすい。)
#--------------------------------------------------------------
# ホストゾーン作成後、お名前comで発行しtらドメインを使用している場合、ネームサーバーの変更が必要！
# ネームサーバー変更が反映されたかどうかは右のコマンドで確認できる（dig poppie.site ns +short）
# see: https://qiita.com/m-oka-system/items/34f3ac3d98210d06dbc8
# お名前comでroute53で取得した4つのネームサーバーを登録するとき、最後のピリオド「.」は無しで登録しないと、そもそもお名前comで登録できない
# resource "aws_route53_zone" "public" {
#   name = var.domain
# }


# フロントエンド側のロードバランサーに紐づけるAレコード
#----------------------------------------------------------------------------------------------
# ALBの情報を元にRoute53にAレコードを設定(ドメインとALBのDNSを紐付け)
# (Route53に登録したドメイン(poppie.site)でアクセスしてきた時、ロードバランサーに飛ぶように、Aレコードを作成)
#----------------------------------------------------------------------------------------------
resource "aws_route53_record" "this" {
  type    = "A"                             # レコードタイプ
  name    = var.domain                      # レコード名
  zone_id = data.aws_route53_zone.public.id # ホストゾーンのID(手動で生成したホストゾーンを指定する場合)
  # zone_id = aws_route53_zone.public.id    # ホストゾーンのID(resourceでterraformにて生成する場合)

  alias {
    name                   = var.aws_lb_frontend.dns_name # DNS
    zone_id                = var.aws_lb_frontend.zone_id  # ホストゾーン
    evaluate_target_health = true                 # 指定されたリソースのヘルスを評価するかどうか
  }
}


# バックエンド側のロードバランサーに紐づけるAレコード
#----------------------------------------------------------------------------------------------
# ALBの情報を元にRoute53にAレコードを設定(ドメインとALBのDNSを紐付け)
# (Route53に登録したドメイン(poppie.site)でアクセスしてきた時、ロードバランサーに飛ぶように、Aレコードを作成)
#----------------------------------------------------------------------------------------------
resource "aws_route53_record" "backend" {
  type    = "A"                             # レコードタイプ
  name    = var.backend_sub_domain          # バックエンドのレコード名
  zone_id = data.aws_route53_zone.public.id # ホストゾーンのID(手動で生成したホストゾーンを指定する場合)
  # zone_id = aws_route53_zone.public.id    # ホストゾーンのID(resourceでterraformにて生成する場合)

  alias {
    name                   = var.aws_lb_backend.dns_name # DNS
    zone_id                = var.aws_lb_backend.zone_id  # ホストゾーン
    evaluate_target_health = true                 # 指定されたリソースのヘルスを評価するかどうか
  }
}
