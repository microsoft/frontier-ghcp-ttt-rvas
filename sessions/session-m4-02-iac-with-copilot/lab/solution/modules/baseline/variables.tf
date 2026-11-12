variable "name_prefix" {
  description = "Prefix for every resource name"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "zones" {
  description = "Two availability zones, one per subnet"
  type        = list(string)
}

variable "ssh_allowed_cidrs" {
  description = "CIDR ranges allowed to reach the admin security group on port 22"
  type        = list(string)
  default     = ["10.0.0.0/16"]
}

variable "tags" {
  description = "Tags added to every resource"
  type        = map(string)
  default     = {}
}
