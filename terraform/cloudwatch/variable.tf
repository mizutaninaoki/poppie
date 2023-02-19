#------------------------------------------
# variable
#------------------------------------------
# variable "apps_name" {
#   type    = list(string)
#   default = ["nginx", "rails"]
# }

variable "app_name" {
  type    = string
}

variable "log_retention_in_days" {
  type    = number
  default = 30
}