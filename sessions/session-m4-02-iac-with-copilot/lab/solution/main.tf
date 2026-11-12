terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# The skip_* settings and dummy keys let `terraform plan` run with no AWS account.
# Never use them for a real deployment.
provider "aws" {
  region                      = var.region
  access_key                  = "lab-only"
  secret_key                  = "lab-only"
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  skip_metadata_api_check     = true
  skip_region_validation      = true
}

# Copilot writes ./modules/baseline in Part 3 of the lab.
module "baseline" {
  source = "./modules/baseline"

  name_prefix = var.name_prefix
  vpc_cidr    = var.vpc_cidr
  zones       = var.zones
  tags        = var.tags
}
