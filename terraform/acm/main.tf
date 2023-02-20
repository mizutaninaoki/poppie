##########################################################################################################
# お名前comで取得したドメインを使用する場合、aws_route53_zoneはroute53のコンソール画面でRoute53にパブリックホストゾーンを作成し、
# Route53から取得したNSレコードをお名前comに登録して、反映されるまで待つ必要あり。(反映には数時間〜数日かかる)
# 以下コード(ACM証明書の発行)はNSレコードが反映されてから実行すること。
# 参照：https://qiita.com/m-oka-system/items/34f3ac3d98210d06dbc8
##########################################################################################################

#------------------------------------------
# ACM証明書
# (ACM証明書はSSL証明書の管理を担ってくれるマネージメントサービスで、ドメイン検証をサポートしてくれる。SSL証明書の自動更新も行ってくれる。AWSではHTTPS化するために必要。)
#------------------------------------------
resource "aws_acm_certificate" "this" {
  domain_name = var.domain # 検証するドメイン名

  # DNS検証を指定すると、Attributesでdomain_validation_optionsが返ってきます。これを次のリソースで活用します。
  validation_method = "DNS" # ドメイン所有権の検証方法を設定。DNS検証かEメール検証のどちらかを選択できる。SSL証明書を自動更新したい場合はDNS検証を選択する。
  # subject_alternative_namesには頭に*.を付け加えてサブドメインにも対応したワイルドカード証明書を作成するようにしています。こうすることで、ネイキッドドメイン、サブドメインどちらとも保護することができます。たとえば、ドメイン名がexample.comの場合、「test.example.com」や「test2.example.com」のようなドメインが保護されます。
  subject_alternative_names = ["*.${data.aws_route53_zone.public.name}"]

  # ACMの lifecycle ブロックでは証明書再作成時の挙動を指定しています。デフォルトではリソースの再作成が必要な場合、「既存のリソースを削除してから新しいリソースを作成する」という挙動になります。lifecycleブロックでcreate_before_destroy = trueを指定することで「新しいリソースを作成してから、古いリソースを削除する」という動作になりますので、SSL証明書再作成時の影響を最小限にすることができます。
  lifecycle {
    create_before_destroy = true # trueにするとACM証明書の期限が切れる前に新しい証明書を自動的に作成してくれる。またterraform destroyしてもACM証明書を消去しないでくれる。
  }
}


# TODO: ※ 以下２つは必要であればコメントを外す()
#-------------------------------------------------------------
# 検証用DNSレコード追加
# (※ 上のsubject_alternative_namesにドメインを追加した場合、そのドメインのDNSレコードも必要になるので注意。)
#-------------------------------------------------------------
# resource "aws_route53_record" "poppie_certificate" {
#   name = aws_acm_certificate.this.domain_validation_options[0]
#   type = aws_acm_certificate.this.domain_validation_options[0]
#   records = [aws_acm_certificate.this.domain_validation_options[0].resource_record_value]
#   zone_id = data.aws_route53_zone.this.id
#   ttl = 60
# }

#-------------------------------------------------------------
# SSL証明書の検証完了まで待機
# (aws_acm_certificate_validationリソースは特殊でapply時にSSl証明書の検証が完了するまで待ってくれる。)
#-------------------------------------------------------------
# resource "aws_acm_certificate_validation" "poppie" {
#   certificate_arn = aws_acm_certificate.this.arn
#   validation_record_fqdns = [aws_route53_record.poppie_certificate.fqdn]
# }


#------------------------------------------
# Route53のホストゾーン内にCNAMEレコードを作成(DNS検証のため)
# (ホストゾーンはDNSレコードを束ねるリソースのこと。route53でドメインを登録した場合、自動的に作成される。(NSレコードとSOAレコードも自動で作成される。))
#------------------------------------------
# ドメインの所有者を検証するために「DNS検証」を指定しましたので、Route53に検証用のCNAMEレコードを登録します。今はまだ証明書を作成しただけなので「検証保留中」となっている状態です。コンソール画面であれば「Route53でのレコードの作成」のボタンを押すだけなので非常に簡単なのですがこれをTerraformで行います。
# see: https://qiita.com/m-oka-system/items/34f3ac3d98210d06dbc8#acm%E3%81%AE%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E6%A4%9C%E8%A8%BC
resource "aws_route53_record" "this" {
  depends_on = [aws_acm_certificate.this] # ACM証明書がないとCNAMEレコードを作成できない。

  for_each = {
    for dvo in aws_acm_certificate.this.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name     # レコード名
  records         = [each.value.record] # レコード値
  ttl             = 60
  type            = each.value.type               # レコードタイプ(CNAMEが指定されている)
  zone_id         = data.aws_route53_zone.public.id # aws_route53_zoneをdataでAWSから取得してきた場合の指定方法。route53に作成したホストゾーンを指定。
}

#------------------------------------------
# 作ったACM証明書とCNAMEレコードの紐付け
#------------------------------------------
resource "aws_acm_certificate_validation" "this" {
  certificate_arn         = aws_acm_certificate.this.arn                          # 検証中ACM証明書のARN
  validation_record_fqdns = [for record in aws_route53_record.this : record.fqdn] # 検証するFQDNのリスト。DNS検証方法のみ指定可能。
}

