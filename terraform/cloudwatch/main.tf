# -------------------------------------------------------------------
# cloudwatch_logグループをそれぞれ定義(railsとnginx、2つのログ出力先を作成)
# -------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "log" {
  count = length(var.apps_name)
  name  = "/ecs/poppie/${var.apps_name[count.index]}"
  retention_in_days = var.log_retention_in_days # ログの保存期間
}

#-------------------------------------------------------------------
# ログストリームの作成
#------------------------------------------------------------------
# ログストリームは、同じソースを共有する一連のログイベントです。より具体的には、ログストリームは一般的に、モニタリングされているアプリケーションインスタンスやリソースから送信された順序でイベントを表すものです。
# see: https://blog.serverworks.co.jp/tech/2019/11/29/cfnlogstream/
resource "aws_cloudwatch_log_stream" "log-stream" {
  count = length(var.apps_name)
  name           = "${var.apps_name[count.index]}_log_stream"
  log_group_name = aws_cloudwatch_log_group.log[count.index].name

}





# #-------------------------------------------------------------------
# # cloudwatch_logグループを定義
# #-------------------------------------------------------------------
# resource "aws_cloudwatch_log_group" "django-log-group" {
#   name              = "/ecs/${var.app_name}/django"
#   retention_in_days = var.log_retention_in_days
# }

# #-------------------------------------------------------------------
# # ログストリームの作成
# #------------------------------------------------------------------
# # ログストリームは、同じソースを共有する一連のログイベントです。より具体的には、ログストリームは一般的に、モニタリングされているアプリケーションインスタンスやリソースから送信された順序でイベントを表すものです。
# # see: https://blog.serverworks.co.jp/tech/2019/11/29/cfnlogstream/
# resource "aws_cloudwatch_log_stream" "django-log-stream" {
#   name           = "django-log-stream"
#   log_group_name = aws_cloudwatch_log_group.django-log-group.name
# }