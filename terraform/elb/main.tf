#------------------------------------------
# アプリケーションロードバランサーの定義
#------------------------------------------
resource "aws_lb" "this" {
  name               = "${var.app_name}-alb"          # ロードバランサー名
  load_balancer_type = "application"                          # ロードバランサーの種類
  internal           = false                                  # 「インターネット向け」なのか「VPC内部向け」なのか。falseにすると「インターネット向け」になる。
  idle_timeout       = 60                                     # タイムアウトの指定。デフォルトは60秒。
  security_groups    = [var.alb_security_group_load-balancer.id] # セキュリティーグループ(複数指定可)
  # enable_deletion_protection = true # trueにすると削除保護が有効可される。（TODO: 本番実運用ではコメント解除する）
  subnets = flatten([var.public_subnet_ids]) # パブリックサブネット２つにリクエストを振り分ける

  # 作成したS3バケットへログを送りたい場合はコメント解除
  # access_log {
  #   bucket = aws_s3_bucket.alb_log.id
  #   enabled = true
  # }
}



# Target group
# TODO: portを443のみにして、nginxのECSにはhttpからはアクセスできないようにする
#------------------------------------------
# ALBのターゲットグループを作成
#------------------------------------------
resource "aws_alb_target_group" "default_target_group" {
  name        = "${var.app_name}-tg-to-nginx"
  target_type = "ip" # ターゲットタイプ。EC2インスタンスやIPアドレス、Lambda関数等設定できる。ECS Fargatでは「ip」を指定する。
  # ターゲットタイプに「ip」を指定した場合、vpc_id、port、protocolの設定が必要。
  # ALBからECSタスクのコンテナへトラフィックを振り分ける設定
  vpc_id               = var.vpc_id      # ターゲット対象のvpc id
  port                 = 80              # ポート番号
  protocol             = "HTTP"          # プロトコル。多くの場合、HTTPSの終端はALBで行うため、protocolには「HTTP」を指定することが多い。
  deregistration_delay = 300             # ターゲットの登録を解除する前に、ALBが待機する時間を設定できる。秒単位で設定でき、デフォルトは300秒。
  health_check {                         # ヘルスチェックの設定(コンテナへの死活監視設定)
    path                = var.health_check_path            # ヘルスチェックで使用するパス
    healthy_threshold   = 5              # 正常判定を行うまでヘルスチェック実行回数
    unhealthy_threshold = 2              # 以上判定を行うまでヘルスチェック実行回数
    # timeout             = 5              # ヘルスチェックのタイムアウト時間(秒)
    timeout             = 2              # ヘルスチェックのタイムアウト時間(秒)
    # interval            = 30             # ヘルスチェック実行間隔(秒)
    interval            = 5             # ヘルスチェック実行間隔(秒)
    matcher             = 200            # 正常判定を行うために使用するHTTPステータスコード
    port                = "traffic-port" # ヘルスチェックで使用するポート。「traffic-port」と指定した場合、ターゲットグループで指定したポート番号(つまり80番)が使われる。
    protocol            = "HTTP"         # ヘルスチェック時に使用するプロトコル
  }
}


#----------------------------------------------------------------------
# リスナーの作成(ALBとターゲットグループのひも付け)(HTTPでのアクセスを受け付ける)
#----------------------------------------------------------------------
resource "aws_alb_listener" "http" {
  port              = "80"
  protocol          = "HTTP"
  load_balancer_arn = aws_lb.this.arn # 紐付けるロードバランサーのarn
  depends_on        = [aws_alb_target_group.default_target_group]

  # デフォルトアクションはいづれのリスナールールに合致しない場合に実行されるアクション。指定できるのは以下の通り。
  # forward: リクエストを別のターゲットグループに転送
  # fixed-response: 固定のHTTPレスポンスを応答
  # redirect: 別のHTTPにリダイレクト

  # TODO: 一時的に80ポートでアクセスできるか確認のため!!
  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.default_target_group.arn
  }
  # httpでアクセスしてきたら、httpsへリダイレクトさせる
  # default_action {
  #   type = "redirect"

  #   redirect {
  #     port        = "443"
  #     protocol    = "HTTPS" # ALBではHTTP or HTTPSのみ指定可能
  #     status_code = "HTTP_301"
  #   }
  # }
}




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
#   depends_on        = [aws_alb_target_group.default_target_group]


#   default_action {
#     type             = "forward"
#     # ここにECSのサービスをターゲットとして指定する
#     # target_group_arn = aws_lb_target_group.this.arn
#     target_group_arn = var.alb_arn
#   }

#   # "ok" という固定レスポンスを設定する(TODO: ECSコンテナが用意できたらターゲットをECSに修正)
#   # default_action {
#   #   type = "fixed-response" # ルーティングアクション
#   #   fixed_response {
#   #     content_type = "text/plain"
#   #     status_code  = "200"
#   #     message_body = "ok"
#   #   }
#   # }
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
