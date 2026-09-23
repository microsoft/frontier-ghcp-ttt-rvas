# Root module — wires together all three tier modules

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}

# --- Network Layer ---
module "network" {
  source = "./modules/network"

  project_name = var.project_name
  environment  = var.environment
  vpc_cidr     = var.vpc_cidr
}

# --- Compute Layer ---
module "compute" {
  source = "./modules/compute"

  project_name          = var.project_name
  environment           = var.environment
  vpc_id                = module.network.vpc_id
  public_subnet_ids     = module.network.public_subnet_ids
  private_app_subnet_ids = module.network.private_app_subnet_ids
  instance_type         = var.instance_type
  min_size              = var.asg_min_size
  max_size              = var.asg_max_size
}

# --- Database Layer ---
module "database" {
  source = "./modules/database"

  project_name            = var.project_name
  environment             = var.environment
  vpc_id                  = module.network.vpc_id
  private_db_subnet_ids   = module.network.private_db_subnet_ids
  app_security_group_id   = module.compute.app_security_group_id
  db_name                 = var.db_name
  db_username             = var.db_username
  db_password             = var.db_password
  db_instance_class       = var.db_instance_class
}
