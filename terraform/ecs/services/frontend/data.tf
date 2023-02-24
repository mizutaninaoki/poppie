#-------------------------------------------------------
# aws_caller_identity(awsを操作するユーザーの情報取得)
#-------------------------------------------------------
data "aws_caller_identity" "user" {}


#-------------------------------------------------------
# template_file
#-------------------------------------------------------
data "template_file" "frontend_container_definitions" {
  # fileに渡すパスは実行するterraform/main.tfからのパスを指定する
  template = file("./ecs/services/frontend/frontend_container_definitions.json")
  vars = {
    account_id  = local.account_id
    next_public_scheme     = var.next_public_scheme
    next_public_nginx_port     = var.next_public_nginx_port
    next_public_poppie_host     = var.next_public_poppie_host
    env_name     = var.env_name
    node_env     = var.node_env
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