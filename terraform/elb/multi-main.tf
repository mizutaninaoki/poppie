# #------------------------------------------
# # ALBのセキュリティグループ作成
# #------------------------------------------
# resource "aws_security_group" "security_group" {
#   name        = "${var.app_name}-alb" # セキュリティーグループ名
#   description = "${var.app_name}-alb" # セキュリティーグループについてのdescription

#   vpc_id = var.vpc_id # 紐付けるvpc id

#   # アウトバウンドルール
#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   tags = {
#     Name = "${var.app_name}-alb"
#   }
# }

# #----------------------------------------------------------------------------
# # 上で作成したALBのセキュリティグループにingressのセキュリティグループルールを追加(http)
# #----------------------------------------------------------------------------
# resource "aws_security_group_rule" "http" {
#   security_group_id = aws_security_group.security_group.id # ルールを追加するセキュリティグループ
#   type              = "ingress"                            # インバウンドルール
#   from_port         = 80
#   to_port           = 80
#   protocol          = "tcp"
#   cidr_blocks       = ["0.0.0.0/0"]
# }

# #----------------------------------------------------------------------------
# # 上で作成したALBのセキュリティグループにingressのセキュリティグループルールを追加(https)
# #----------------------------------------------------------------------------
# resource "aws_security_group_rule" "https" {
#   security_group_id = aws_security_group.security_group.id # ルールを追加するセキュリティグループ
#   type              = "ingress"                            # インバウンドルール
#   from_port         = 443
#   to_port           = 443
#   protocol          = "tcp"
#   cidr_blocks       = ["0.0.0.0/0"]
# }



# #------------------------------------------
# # アプリケーションロードバランサーの定義
# #------------------------------------------
# resource "aws_lb" "this" {
#   name               = var.app_name                           # ロードバランサー名
#   load_balancer_type = "application"                          # ロードバランサーの種類
#   internal           = false                                  # 「インターネット向け」なのか「VPC内部向け」なのか。falseにすると「インターネット向け」になる。
#   idle_timeout       = 60                                     # タイムアウトの指定。デフォルトは60秒。
#   security_groups    = [aws_security_group.security_group.id] # セキュリティーグループ(複数指定可)
#   # enable_deletion_protection = true # trueにすると削除保護が有効可される。（TODO: 本番実運用ではコメント解除する）
#   subnets = flatten([var.public_subnet_ids]) # パブリックサブネット２つに

#   # 作成したS3バケットへログを送りたい場合はコメント解除
#   # access_log {
#   #   bucket = aws_s3_bucket.alb_log.id
#   #   enabled = true
#   # }
# }

# #----------------------------------------------------------------------
# # リスナーの作成(ALBとターゲットグループのひも付け)(HTTPでのアクセスを受け付ける)
# #----------------------------------------------------------------------
# resource "aws_alb_listener" "http" {
#   port              = "80"
#   protocol          = "HTTP"
#   load_balancer_arn = aws_lb.this.arn # 紐付けるロードバランサーのarn

#   # デフォルトアクションはいづれのリスナールールに合致しない場合に実行されるアクション。指定できるのは以下の通り。
#   # forward: リクエストを別のターゲットグループに転送
#   # fixed-response: 固定のHTTPレスポンスを応答
#   # redirect: 別のHTTPにリダイレクト

#   # httpでアクセスしてきたら、httpsへリダイレクトさせる
#   default_action {
#     type = "redirect"

#     redirect {
#       port        = "443"
#       protocol    = "HTTPS" # ALBではHTTP or HTTPSのみ指定可能
#       status_code = "HTTP_301"
#     }
#   }
# }

# # TODO: 必要か検証！
# #-----------------------------------------------------------------------
# # リスナーの作成(ALBとターゲットグループのひも付け)(HTTPはHTTPSへリダイレクトさせる)
# #-----------------------------------------------------------------------
# # resource "aws_alb_listener" "redirect_http_to_https" {
# #   port     = "8080"
# #   protocol = "HTTP"
# #   load_balancer_arn = aws_lb.this.arn # 紐付けるロードバランサーのarn

# #   # httpでアクセスしてきたら、httpsへリダイレクトさせる
# #   default_action {
# #     type = "redirect"

# #     redirect {
# #       port        = "443"
# #       protocol    = "HTTPS"
# #       status_code = "HTTP_301"
# #     }
# #   }
# # }

# #-----------------------------------------------------------------------
# # リスナーの作成(ALBとターゲットグループのひも付け)(HTTPSでのアクセスを受け付ける)
# #-----------------------------------------------------------------------
# resource "aws_alb_listener" "https" {
#   port              = "443"
#   protocol          = "HTTPS"
#   ssl_policy        = "ELBSecurityPolicy-2016-08" # AWSではこのセキュリティポリシーの利用が推奨されている
#   load_balancer_arn = aws_lb.this.arn             # 紐付けるロードバランサーのarn
#   certificate_arn   = var.acm_id                  # acm証明書のid。ALBとACM証明書の紐付けはaws_lb_listenerのcertificate_arn Argumentに証明書のARNを代入することでできます。

#   # default_action {
#   #   type             = "forward"
#   #   # ここにECSのサービスをターゲットとして指定する
#   #   # target_group_arn = aws_lb_target_group.this.arn
#   #   target_group_arn = var.alb_arn
#   # }

#   # "ok" という固定レスポンスを設定する(TODO: ECSコンテナが用意できたらターゲットをECSに修正)
#   default_action {
#     type = "fixed-response" # ルーティングアクション
#     fixed_response {
#       content_type = "text/plain"
#       status_code  = "200"
#       message_body = "ok"
#     }
#   }
# }




# #---------------------------------------------------
# # data (Route53に登録したpoppie.jpのホストゾーンを取得)
# #---------------------------------------------------
# data "aws_route53_zone" "this" {
#   name         = var.domain
#   private_zone = false # パブリックホストゾーン指定
# }

# #----------------------------------------------------------------------------------------------
# # ALBの情報を元にRoute53にAレコードを設定(ドメインとALBのDNSを紐付け)
# # (Route53に登録したドメイン(poppie.site)でアクセスしてきた時、ロードバランサーに飛ぶように、Aレコードを作成)
# #----------------------------------------------------------------------------------------------
# resource "aws_route53_record" "this" {
#   type    = "A"                           # レコードタイプ
#   name    = var.domain                    # レコード名
#   zone_id = data.aws_route53_zone.this.id # ホストゾーンのID

#   alias {
#     name                   = aws_lb.this.dns_name # DNS
#     zone_id                = aws_lb.this.zone_id  # ホストゾーン
#     evaluate_target_health = true                 # 指定されたリソースのヘルスを評価するかどうか
#   }
# }

