locals {
  # AWSアカウントIDを取得
  account_id = data.aws_caller_identity.user.account_id
}

# FIXME: frontendのtask definitionはlifecycleのignore changesを指定していないのに、terraform planで最新のtask definitionにreplaceしてくれない。
# そのためnext.jsのコードのみ変更した時はタスク定義の環境変数を変えたりして、無理やり差分をださなければいけない。
# ------------------------------------------
# nextのタスク定義を作成
# ------------------------------------------
resource "aws_ecs_task_definition" "frontend" {
  family = "${var.app_name}-frontend-task-definition" # ファミリーとはタスク定義名のプレフィックス。ファミリーにリビジョン番号を付与したものがタスク定義名になる。最初は「example:1」のようになる。
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
  container_definitions = data.template_file.frontend_container_definitions.rendered # タスクで実行するコンテナ定義
  depends_on            = [var.db_instance_postgres] # nextも念の為、RDSインスタンスが作成されるのを待ってからタスク定義を作成するようにする
  # INFO: タスク定義のjsonにコメント書けないため、ここに記述
  # name: コンテナの名前
  # image: 使用するコンテナイメージ
  # memory コンテナに割り当てるメモリ。コンテナすべてのメモリが、上に定義した512MB以内にする。
  # essential: タスク実行に必須かどうかのフラグ
  # logConfigration:  CloudWatch Logsへ記録するログの設定
  # portMappings: マッピングするコンテナのポート番号
  # secrets: SSMパラメータストアで管理している環境変数(nameがコンテナ内の環境変数名、valueFromがSSMパラメータストアのキー名)
}


#------------------------------------------
# ECSのサービスを作成(next)
#------------------------------------------
resource "aws_ecs_service" "frontend" {
  name            = "${var.app_name}-frontend-service"          # サービス名
  launch_type     = "FARGATE"                                   # タスク定義の起動タイプ
  desired_count   = "1"                                         # ECSタスクを起動するコンテナ数
  # ECS Execを有効化する場合はTrue。以下コマンドでECS Fargateのコンテナ内に入れる。
  # aws ecs execute-command --task=【タスクID】 --interactive --cluster=【クラスター名】 --container=【コンテナ名】 --command /bin/sh
  enable_execute_command   = true
  cluster         = var.cluster_arn                             # 当該ECSサービスを配置するECSクラスターの指定
  task_definition = aws_ecs_task_definition.frontend.arn        # タスク定義
  depends_on      = [aws_ecs_task_definition.frontend]          # リソースの作成が完了するのを待ってから当該リソースの作成を開始する。

  # タグをlatestのままECRにプッシュしているため、そのままではTerraformがECRのimageが変わったことを検知してくれない。
  # そのため、ECSサービスは毎回、強制的にデプロイしてタスク定義をlatestの最新のものを生成するようにしている。(force_new_deploymentとtriggers、２つの設定が必要)
  # see: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_service#redeploy-service-on-every-apply
  # TODO: 以下のforce_new_deploymentとtriggers、2つを設定したが、ECRにimageをだけ変更しても変更を検知してくれない。terraform planで検知される方法を探す。
  # force_new_deployment = true
  # triggers = {
  #   redeployment = timestamp()
  # }

  # サービスのネットワーク設定
  network_configuration {
    security_groups  = [var.alb_security_group_ecs.id]
    # subnets          = flatten([var.public_subnet_ids]) # タスクの起動を許可するサブネット(プライベートサブネットで起動させる場合はプライベートサブネットのIDを指定すること)
    subnets          = flatten([var.private_subnet_ids]) # タスクの起動を許可するサブネット(プライベートサブネットで起動させる場合はプライベートサブネットのIDを指定すること)
    assign_public_ip = true
  }

  # ECSタスクの起動後に紐付けるELBターゲットグループ
  load_balancer {
    target_group_arn = var.aws_alb_target_group_ecs_frontend_arn # ターゲットグループ
    container_name   = "next" # frontendのALBに紐づけるコンテナはnext
    container_port   = 3000 # nextのポート番号
  }

  # Fargateの場合、デプロイのたびにタスク定義が更新され、強制的にplan時に差分が出る。毎回サービスを更新したくない場合、terraformではタスク定義の変更を無視すべき。
  # ignore_changesに指定したパラメータは、リソースの初回作成時を除き、変更を無視するようになる。
  # lifecycle {
  #   ignore_changes = [task_definition]
  # }
}
