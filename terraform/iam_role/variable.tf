#------------------------------------------
# variable
#------------------------------------------
# variable "name" {}       # IAMロール名
# variable "policy_arn" {} # ポリシードキュメント
# variable "identifier" {} # IAMロールを紐づけるAWSのサービス識別子


variable "app_name" {
  type = string
}