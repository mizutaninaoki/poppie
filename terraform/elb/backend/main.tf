#------------------------------------------
# backendのアプリケーションロードバランサーの定義
#------------------------------------------
resource "aws_lb" "backend" {
  name               = "${var.app_name}-alb-backend"          # ロードバランサー名
  load_balancer_type = "application"                          # ロードバランサーの種類
  internal           = false                                  # 「インターネット向け」なのか「VPC内部向け」なのか。falseにすると「インターネット向け」になる。
  idle_timeout       = 60                                     # タイムアウトの指定。デフォルトは60秒。
  security_groups    = [var.alb_security_group_load-balancer.id] # セキュリティーグループ(複数指定可)
  # enable_deletion_protection = true # trueにすると削除保護が有効可される。（TODO: 本番実運用ではコメント解除する）
  subnets = flatten([var.public_subnet_ids]) # パブリックサブネット２つにリクエストを振り分ける
}


#------------------------------------------
# ALBのターゲットグループを作成(バックエンド)
#------------------------------------------
resource "aws_alb_target_group" "backend" {
  name        = "${var.app_name}-backend-tg-ecs-to-nginx"
  target_type = "ip" # ターゲットタイプ。EC2インスタンスやIPアドレス、Lambda関数等設定できる。ECS Fargatでは「ip」を指定する。
  # ターゲットタイプに「ip」を指定した場合、vpc_id、port、protocolの設定が必要。
  # ALBからECSタスクのコンテナへトラフィックを振り分ける設定
  vpc_id               = var.vpc_id      # ターゲット対象のvpc id
  port                 = 80              # ポート番号(プロトコルをHTTPにする場合、ポート番号は80)
  protocol             = "HTTP"          # プロトコル。多くの場合、HTTPSの終端はALBで行うため、protocolには「HTTP」を指定することが多い。
  deregistration_delay = 300             # ターゲットの登録を解除する前に、ALBが待機する時間を設定できる。秒単位で設定でき、デフォルトは300秒。

  health_check {                         # ヘルスチェックの設定(コンテナへの死活監視設定)
    path                = var.nginx_health_check_path # ヘルスチェックで使用するパス
    healthy_threshold   = 5              # 正常判定を行うまでヘルスチェック実行回数
    unhealthy_threshold = 2              # 以上判定を行うまでヘルスチェック実行回数
    timeout             = 5              # ヘルスチェックのタイムアウト時間(秒) 5秒より短くすると、短すぎてdjango側で応答する前にエラーになる可能性あり
    interval            = 10             # ヘルスチェック実行間隔(秒) 10秒より短くすると、短すぎてdjango側で応答する前にエラーになる可能性あり
    matcher             = 200            # 正常判定を行うために使用するHTTPステータスコード
    port                = "traffic-port" # ヘルスチェックで使用するポート。「traffic-port」と指定した場合、ALBからforwardされるターゲットのaws_ecs_service.load_balancer.container_portで指定したポートが指定される。
    protocol            = "HTTP"         # ヘルスチェック時に使用するプロトコル
  }
}


#----------------------------------------------------------------------
# リスナーの作成(ALBとターゲットグループのひも付け)(HTTPでのアクセスを受け付ける)
#----------------------------------------------------------------------
resource "aws_alb_listener" "backend_http" {
  port              = "80"
  protocol          = "HTTP"
  load_balancer_arn = aws_lb.backend.arn # 紐付けるロードバランサーのarn
  depends_on        = [aws_alb_target_group.backend]

  # デフォルトアクションはいづれのリスナールールに合致しない場合に実行されるアクション。指定できるのは以下の通り。
  # forward: リクエストを別のターゲットグループに転送
  # fixed-response: 固定のHTTPレスポンスを応答
  # redirect: 別のHTTPにリダイレクト

  # httpでアクセスしてきたら、httpsへリダイレクトさせる
  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS" # ALBではHTTP or HTTPSのみ指定可能
      status_code = "HTTP_301"
    }
  }
}


#-----------------------------------------------------------------------
# リスナーの作成(ALBとターゲットグループのひも付け)(HTTPSでのアクセスを受け付ける)
#-----------------------------------------------------------------------
resource "aws_alb_listener" "backend_https" {
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08" # AWSではこのセキュリティポリシーの利用が推奨されている
  load_balancer_arn = aws_lb.backend.arn          # 紐付けるロードバランサーのarn
  certificate_arn   = var.acm_id                  # acm証明書のid。ALBとACM証明書の紐付けはaws_lb_listenerのcertificate_arn Argumentに証明書のARNを代入することでできます。(サブドメインも対応可の証明書)
  depends_on        = [aws_alb_target_group.backend]

  # httpsでのアクセスをECSのターゲットグループに転送
  default_action {
    type             = "forward"
    # ここにECSのサービスをターゲットとして指定する
    target_group_arn = aws_alb_target_group.backend.arn
  }
}


