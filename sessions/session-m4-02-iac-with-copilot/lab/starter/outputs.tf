output "vpc_id" {
  description = "ID of the VPC"
  value       = module.baseline.vpc_id
}

output "subnet_ids" {
  description = "IDs of the two subnets"
  value       = module.baseline.subnet_ids
}

output "bucket_name" {
  description = "Name of the storage bucket"
  value       = module.baseline.bucket_name
}
