variable "region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-1"
}

variable "name_prefix" {
  description = "Prefix for every resource name"
  type        = string
  default     = "lab"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "zones" {
  description = "Two availability zones, one per subnet"
  type        = list(string)
  default     = ["eu-west-1a", "eu-west-1b"]
}

variable "tags" {
  description = "Tags added to every resource"
  type        = map(string)
  default = {
    project = "iac-lab"
    owner   = "training"
  }
}
