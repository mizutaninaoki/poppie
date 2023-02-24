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

variable "aws_iam_role_ecs_task_execution" {
  type = object({
    arn = string
  })
}

variable "db_instance_postgres" {
  type = object({
    address: string
  })
}

variable "aws_alb_target_group_ecs_backend_arn" {
  type = string
}

variable "alb_security_group_ecs" {}

variable "private_subnet_ids" {}


#
# 以下環境変数
#

variable "env_name" {
  type = string
}

variable "django_secret_key" {
  type = string
}

variable "aws_s3_access_key_id" {
  type = string
}

variable "aws_s3_secret_access_key_id" {
  type = string
}

variable "aws_storage_bucket_name" {
  type = string
}

variable "aws_region_name" {
  type = string
}

variable "engine" {
  type = string
}

variable "postgres_db" {
  type = string
}

variable "postgres_user" {
  type = string
}

variable "postgres_password" {
  type = string
}

variable "db_host" {
  type = string
}

variable "db_port" {
  type = number
}

variable "database" {
  type = string
}

variable "allowed_hosts" {
  type = string
}

variable "cors_allowed_origins" {
  type = string
}
