locals {
  # AWSアカウントIDを取得
  account_id = data.aws_caller_identity.user.account_id
}

# ------------------------------------------
# nginx, djangoのタスク定義を作成
# ------------------------------------------
resource "aws_ecs_task_definition" "backend" {
  family = "${var.app_name}-backend-task-definition" # ファミリーとはタスク定義名のプレフィックス。ファミリーにリビジョン番号を付与したものがタスク定義名になる。最初は「example:1」のようになる。
  # メモリサイズに関しては以下参照
  # https://tech.unifa-e.com/entry/2020/08/28/161733
  cpu                      = 256                                         # cpuサイズ(「1」(vCPU)の書き方もできる)
  memory                   = 512                                         # メモリサイズ(「1」(GB)の書き方もできる)
  network_mode             = "awsvpc"                                    # Fargateの場合、NICが付与されるネットワークモードのawsvpcのみ指定可能
  requires_compatibilities = ["FARGATE"]                                 # 起動モード
  skip_destroy             = false                                       # 古いタスク定義を残すかどうか。デフォルトはfalseで残さない。
  # タスク実行ロール -> タスクを実行する際(djangoコンテナ等を立ち上げる際)に必要な権限のロール
  # タスクロール -> タスク実行して起動したコンテナたちがAWSリソースにアクセスする際の権限のロール
  # see: https://zenn.dev/sugay0519/articles/88f13ca589fcba
  execution_role_arn       = var.aws_iam_ecs_task_execution_role.arn # タスク実行ロール
  task_role_arn            = var.aws_iam_ecs_task_role.arn # タスクロール(ECS Execを有効化する場合に必要)
  # container_definitions.json内で変数を使うため、data.tfからrenderedで呼び出す
  container_definitions = data.template_file.backend_container_definitions.rendered # タスクで実行するコンテナ定義
  depends_on            = [var.db_instance_postgres] # Djangoでインスタンスのアドレスを知る必要があるため、RDSインスタンスが作成されるのを待ってからタスク定義を作成するようにする
  # 静的ファイルのパスをマウント
  # volume {
  #   name      = "static_volume"
  #   host_path = "/${var.app_name}/staticfiles/"
  # }

  # INFO: タスク定義のjsonにコメント書けないため、ここに記述
  # name: コンテナの名前
  # image: 使用するコンテナイメージ
  # memory コンテナに割り当てるメモリ。コンテナすべてのメモリが、上に定義した512MB以内にする。
  # essential: タスク実行に必須かどうかのフラグ
  # logConfigration:  CloudWatch Logsへ記録するログの設定
  # portMappings: マッピングするコンテナのポート番号
  # secrets: SSMパラメータストアで管理している環境変数(nameがコンテナ内の環境変数名、valueFromがSSMパラメータストアのキー名)
  # gunicornのcommandにて、--working(-w)を3に指定すると、cpu使用率が100%になり、エラーが発生した
}


#------------------------------------------
# ECSのサービスを作成(nginx, next, django)
#------------------------------------------
resource "aws_ecs_service" "ecs_service" {
  name            = "${var.app_name}-backend-service"           # サービス名
  launch_type     = "FARGATE"                                   # タスク定義の起動タイプ
  desired_count   = "1"                                         # ECSタスクを起動するコンテナ数
  # ECS Execを有効化する場合はTrue。以下コマンドでECS Fargateのコンテナ内に入れる。
  # aws ecs execute-command --task=【タスクID】 --interactive --cluster=【クラスター名】 --container=【コンテナ名】 --command /bin/sh
  enable_execute_command   = true
  cluster         = var.cluster_arn                             # 当該ECSサービスを配置するECSクラスターの指定
  task_definition = aws_ecs_task_definition.backend.arn         # タスク定義
  depends_on      = [aws_ecs_task_definition.backend]           # リソースの作成が完了するのを待ってから当該リソースの作成を開始する。

  # サービスのネットワーク設定
  network_configuration {
    security_groups  = [var.alb_security_group_ecs.id]
    # subnets          = flatten([var.public_subnet_ids]) # タスクの起動を許可するサブネット(プライベートサブネットで起動させる場合はプライベートサブネットのIDを指定すること)
    subnets          = flatten([var.private_subnet_ids]) # タスクの起動を許可するサブネット(プライベートサブネットで起動させる場合はプライベートサブネットのIDを指定すること)
    assign_public_ip = true
  }

  # ECSタスクの起動後に紐付けるELBターゲットグループ
  # ALBから転送されるコンテナ。aws_alb_target_group(ターゲットグループ)で定義するヘルスチェックはここのコンテナに送られる。「taffic-port」はここで定義するcontainer_portのポート番号になる。
  load_balancer {
    target_group_arn = var.aws_alb_target_group_ecs_backend_arn # ターゲットグループ
    container_name   = "nginx" # backendのALBに紐づけるコンテナはnginx
    container_port   = 80 # nginxのポート番号
  }

  # Fargateの場合、デプロイのたびにタスク定義が更新され、強制的にplan時に差分が出る。毎回サービスを更新したくない場合、terraformではタスク定義の変更を無視すべき。
  # ignore_changesに指定したパラメータは、リソースの初回作成時を除き、変更を無視するようになる。
  # lifecycle {
  #   ignore_changes = [task_definition]
  # }
}
