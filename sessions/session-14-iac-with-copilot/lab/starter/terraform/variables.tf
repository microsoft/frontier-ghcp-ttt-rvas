# Partial variable definitions — Copilot should complete and extend these

variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name of the project, used in resource naming and tags"
  type        = string
  default     = "copilot-webapp"
}

variable "environment" {
  description = "Deployment environment (dev, staging, production)"
  type        = string
  default     = "dev"
}

# TODO: Add variables for:
# - VPC CIDR block
# - Instance type for compute tier
# - Database instance class
# - Database name, username, password (password should be sensitive)
# - Minimum and maximum Auto Scaling Group size
