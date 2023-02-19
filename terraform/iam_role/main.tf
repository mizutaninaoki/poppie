# # ---------------------------------------------------------------------
# # IAMロールを定義して、ホストに信頼ポリシーを紐付ける(ECSとEC2を操作できるロール)
# # ---------------------------------------------------------------------
# resource "aws_iam_role" "ecs-host-role" {
#   name               = "${var.app_name}_ecs_host_role"
#   # AWS Security Token Service (AWS STS) を使用して、AWS リソースへのアクセスをコントロールできる一時的セキュリティ認証情報を持つ、信頼されたユーザーを作成および提供することができます。
#   assume_role_policy = file("policies/ecs-role.json")
# }

# # ---------------------------------------------------------------------
# # ポリシーを生成してロールに紐付ける(ECSインスタンスに付与するポリシー)
# # ---------------------------------------------------------------------
# resource "aws_iam_role_policy" "ecs-instance-role-policy" {
#   name   = "${var.app_name}_ecs_instance_role_policy"
#   policy = file("policies/ecs-instance-role-policy.json")
#   role   = aws_iam_role.ecs-host-role.id
# }

# # ---------------------------------------------------------------------
# # IAMロールを定義して、ECSに信頼ポリシーを紐付ける(ECSとEC2を操作できるロール)
# # ---------------------------------------------------------------------
# resource "aws_iam_role" "ecs-service-role" {
#   name               = "${var.app_name}_ecs_service_role"
#   assume_role_policy = file("policies/ecs-role.json")
# }

# # ---------------------------------------------------------------------
# # ポリシーを生成してロールに紐付ける(ECSサービスに付与するポリシー)
# # ---------------------------------------------------------------------
# resource "aws_iam_role_policy" "ecs-service-role-policy" {
#   name   = "${var.app_name}_ecs_service_role_policy"
#   policy = file("policies/ecs-service-role-policy.json")
#   role   = aws_iam_role.ecs-service-role.id
# }

# # ---------------------------------------------------------------------
# # インスタンスプロファイルをECSホストロールに付与する
# # ---------------------------------------------------------------------
# # ※ インスタンスプロファイルは IAM ロールのコンテナであり、インスタンスの起動時に EC2 インスタンスにロール情報を渡すために使用できます。
# # 書いてある通り、IAMRoleを納めるための容器であり、EC2にアタッチする時に必要なコネクターの役割をします(インスタンスプロファイルはEC2のみに使われる概念)。
# resource "aws_iam_instance_profile" "ecs" {
#   name = "${var.app_name}_ecs_instance_profile" # インスタンス プロファイルの名前
#   path = "/" # インスタンス プロファイルへのパス。(デフォルトは「/」)
#   role = aws_iam_role.ecs-host-role.name # プロファイルに追加する役割の名前。
# }





# ---------------------------------------------------------------------
# IAMロールを定義して、信頼ポリシーを紐付ける(backend_task)
# ---------------------------------------------------------------------
resource "aws_iam_role" "backend_task" {
  name = "${var.app_name}_backend_task"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}


# ---------------------------------------------------------------------
# IAMロールを定義して、信頼ポリシーを紐付ける(ecs_task_execution)
# ---------------------------------------------------------------------
resource "aws_iam_role" "ecs_task_execution" {
  name = "${var.app_name}_ecs_task_execution"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}


# ---------------------------------------------------------------------
# IAMロールとIAMポリシーを紐付ける
# ---------------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "ecs-task-execution-role-policy-attachment" {
  role       = aws_iam_role.ecs_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
