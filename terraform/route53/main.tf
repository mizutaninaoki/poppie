#---------------------------------------------------
# data (Route53に登録したpoppie.jpのホストゾーンを取得)(手動でroute53のホストゾーンを作成した場合）
#---------------------------------------------------
# data "aws_route53_zone" "this" {
#   name         = var.domain
#   private_zone = false # パブリックホストゾーン指定
# }



#--------------------------------------------------------------
# Route53のホストゾーンを作成(terraformでホストゾーンを作成する場合)
#--------------------------------------------------------------
# ホストゾーン作成後、お名前comで発行しtらドメインを使用している場合、ネームサーバーの変更が必要！
# ネームサーバー変更が反映されたかどうかは右のコマンドで確認できる（dig poppie.site ns +short）
# see: https://qiita.com/m-oka-system/items/34f3ac3d98210d06dbc8
# お名前comでroute53で取得した4つのネームサーバーを登録するとき、最後のピリオド「.」は無しで登録しないと、そもそもお名前comで登録できない
resource "aws_route53_zone" "public" {
  name = var.domain
}

#----------------------------------------------------------------------------------------------
# ALBの情報を元にRoute53にAレコードを設定(ドメインとALBのDNSを紐付け)
# (Route53に登録したドメイン(poppie.site)でアクセスしてきた時、ロードバランサーに飛ぶように、Aレコードを作成)
#----------------------------------------------------------------------------------------------
resource "aws_route53_record" "this" {
  type    = "A"                           # レコードタイプ
  name    = var.domain                    # レコード名
  # zone_id = data.aws_route53_zone.public.id # ホストゾーンのID
  zone_id = aws_route53_zone.public.id # ホストゾーンのID

  alias {
    name                   = var.aws_lb.dns_name # DNS
    zone_id                = var.aws_lb.zone_id  # ホストゾーン
    evaluate_target_health = true                 # 指定されたリソースのヘルスを評価するかどうか
  }
}
