output "vpc_id" {
  description = "ID of the VPC"
  value       = module.network.vpc_id
}

output "alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  value       = module.compute.alb_dns_name
}

output "rds_endpoint" {
  description = "Connection endpoint for the RDS PostgreSQL instance"
  value       = module.database.rds_endpoint
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = module.network.public_subnet_ids
}

output "private_app_subnet_ids" {
  description = "IDs of the private app-tier subnets"
  value       = module.network.private_app_subnet_ids
}

output "private_db_subnet_ids" {
  description = "IDs of the private database-tier subnets"
  value       = module.network.private_db_subnet_ids
}
