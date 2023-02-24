#------------------------------------------
# variable
#------------------------------------------
variable "domain" {
  type = string
}

variable "backend_sub_domain" {
  type = string
}

variable "aws_lb_frontend" {
  type = object({
    dns_name: string,
    zone_id: string
  })
}

variable "aws_lb_backend" {
  type = object({
    dns_name: string,
    zone_id: string
  })
}
