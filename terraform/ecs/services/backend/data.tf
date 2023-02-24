#-------------------------------------------------------
# aws_caller_identity(awsを操作するユーザーの情報取得)
#-------------------------------------------------------
data "aws_caller_identity" "user" {}


#-------------------------------------------------------
# template_file
#-------------------------------------------------------
data "template_file" "backend_container_definitions" {
  # fileに渡すパスは実行するterraform/main.tfからのパスを指定する
  template = file("./ecs/services/backend/backend_container_definitions.json")
  vars = {
    account_id  = local.account_id
    env_name     = var.env_name
    django_secret_key     = var.django_secret_key
    aws_s3_access_key_id = var.aws_s3_access_key_id
    aws_s3_secret_access_key_id     = var.aws_s3_secret_access_key_id
    aws_storage_bucket_name   = var.aws_storage_bucket_name
    aws_region_name  = var.aws_region_name
    engine  = var.engine
    postgres_db  = var.postgres_db
    postgres_user  = var.postgres_user
    postgres_password  = var.postgres_password
    db_host  = var.db_host
    db_port  = var.db_port
    database  = var.database
    allowed_hosts  = var.allowed_hosts
    cors_allowed_origins  = var.cors_allowed_origins
  }
}

# #「AmazonECSTaskExecutionRolePolicy」ロールを継承したポリシードキュメントの定義
# data "aws_iam_policy_document" "ecs_task_execution" {
#   source_json = data.aws_iam_policy.ecs_task_execution_role_policy.policy
#   statement {
#     effect    = "Allow"
#     actions   = ["ssm:GetParameters", "kms:Decrypt"]
#     resources = ["*"]
#   }
# }