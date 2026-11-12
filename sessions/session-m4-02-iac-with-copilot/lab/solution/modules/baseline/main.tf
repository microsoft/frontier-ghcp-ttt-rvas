locals {
  subnet_cidrs = [for i in range(2) : cidrsubnet(var.vpc_cidr, 8, i)]
}

resource "aws_vpc" "this" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = merge(var.tags, { Name = "${var.name_prefix}-vpc" })
}

resource "aws_subnet" "private" {
  count = 2

  vpc_id                  = aws_vpc.this.id
  cidr_block              = local.subnet_cidrs[count.index]
  availability_zone       = var.zones[count.index]
  map_public_ip_on_launch = false

  tags = merge(var.tags, { Name = "${var.name_prefix}-private-${count.index + 1}" })
}

resource "aws_security_group" "admin" {
  name        = "${var.name_prefix}-admin"
  description = "SSH in from the admin range"
  vpc_id      = aws_vpc.this.id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.ssh_allowed_cidrs
  }

  tags = merge(var.tags, { Name = "${var.name_prefix}-admin" })
}

resource "aws_s3_bucket" "data" {
  bucket_prefix = "${var.name_prefix}-data-"

  tags = merge(var.tags, { Name = "${var.name_prefix}-data" })
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket = aws_s3_bucket.data.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "data" {
  bucket = aws_s3_bucket.data.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "data" {
  bucket = aws_s3_bucket.data.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = aws_kms_key.data.arn
    }
  }
}

resource "aws_kms_key" "data" {
  description         = "${var.name_prefix} bucket encryption"
  enable_key_rotation = true

  tags = merge(var.tags, { Name = "${var.name_prefix}-data-key" })
}
