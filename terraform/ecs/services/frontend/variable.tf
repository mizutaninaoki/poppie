#------------------------------------------
# variable
#------------------------------------------
variable "app_name" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "cluster_arn" {
  type = string
}

variable "aws_iam_ecs_task_execution_role" {
  type = object({
    arn = string
  })
}

variable "aws_iam_ecs_task_role" {
  type = object({
    arn = string
  })
}

variable "db_instance_postgres" {
  type = object({
    address: string
  })
}

variable "aws_alb_target_group_ecs_frontend_arn" {
  type = string
}

variable "alb_security_group_ecs" {}

variable "private_subnet_ids" {}


#
# 以下環境変数
#

variable "next_public_scheme" {
  type = string
}

variable "next_public_nginx_port" {
  type = string
}

variable "next_public_poppie_host" {
  type = string
}

variable "env_name" {
  type = string
}

variable "node_env" {
  type = string
}
