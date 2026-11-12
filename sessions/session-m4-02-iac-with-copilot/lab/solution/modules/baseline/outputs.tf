output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.this.id
}

output "subnet_ids" {
  description = "IDs of the two subnets"
  value       = aws_subnet.private[*].id
}

output "bucket_name" {
  description = "Name of the storage bucket"
  value       = aws_s3_bucket.data.id
}
