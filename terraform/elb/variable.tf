#------------------------------------------
# variable
#------------------------------------------
variable "app_name" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "alb_security_group_load-balancer" {
  description = "security group for alb"

  type = object({
    id = string
  })
}

variable "public_subnet_ids" {
  type = list(any)
}

variable "domain" {
  type = string
}

variable "health_check_path" {
  type = string
}

variable "acm_id" {
  type = string
}
