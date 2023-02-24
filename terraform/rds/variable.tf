#------------------------------------------
# variable
#------------------------------------------
variable "app_name" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "alb_security_group_ecs" {
  type = object({
    id: string
  })
}

variable "private_subnet_ids" {}

variable "db_identifier" {
  type = string
}

variable "db_port" {
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
