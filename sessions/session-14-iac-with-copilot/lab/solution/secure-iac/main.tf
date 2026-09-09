# SECURE VERSION — all 6 issues fixed

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
  region = "us-east-1"
}

# --- Variables for sensitive values ---

variable "db_password" {
  description = "Master password for RDS — never hardcode this"
  type        = string
  sensitive   = true
}

variable "vpc_id" {
  description = "VPC ID for resources"
  type        = string
}

variable "public_subnet_ids" {
  description = "Public subnet IDs for ALB"
  type        = list(string)
}

# FIX 1: Security group restricted to specific ports only
resource "aws_security_group" "web" {
  name        = "web-sg"
  description = "Security group for web tier — HTTP and HTTPS only"
  vpc_id      = var.vpc_id

  ingress {
    description = "Allow HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "web-sg"
  }
}

# FIX 2: Password sourced from variable (sensitive), not hardcoded
# FIX 5: Storage encryption enabled
resource "aws_db_instance" "main" {
  identifier        = "production-db"
  engine            = "postgres"
  engine_version    = "15"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  db_name           = "appdb"

  username = "admin"
  password = var.db_password  # FIX 2: From variable, not hardcoded

  storage_encrypted   = true  # FIX 5: Encryption at rest enabled
  multi_az            = true
  publicly_accessible = false

  vpc_security_group_ids = [aws_security_group.web.id]
  skip_final_snapshot    = false
  final_snapshot_identifier = "production-db-final"
  backup_retention_period   = 7

  tags = {
    Name = "production-db"
  }
}

# FIX 3: S3 bucket with public access blocked
resource "aws_s3_bucket" "data" {
  bucket = "my-app-data-bucket"

  tags = {
    Name = "my-app-data-bucket"
  }
}

# FIX 3: Block ALL public access
resource "aws_s3_bucket_public_access_block" "data" {
  bucket = aws_s3_bucket.data.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# FIX 3: Enable server-side encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "data" {
  bucket = aws_s3_bucket.data.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "aws:kms"
    }
    bucket_key_enabled = true
  }
}

# FIX 3: Enable versioning for data protection
resource "aws_s3_bucket_versioning" "data" {
  bucket = aws_s3_bucket.data.id

  versioning_configuration {
    status = "Enabled"
  }
}

# FIX 4: IAM policy with least-privilege permissions
resource "aws_iam_policy" "app_policy" {
  name        = "app-policy"
  description = "Application IAM policy — least privilege"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.data.arn,
          "${aws_s3_bucket.data.arn}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

resource "aws_iam_role" "app_role" {
  name = "app-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "app_attach" {
  role       = aws_iam_role.app_role.name
  policy_arn = aws_iam_policy.app_policy.arn
}

# FIX 6: ALB with access logging enabled
resource "aws_s3_bucket" "alb_logs" {
  bucket = "my-app-alb-access-logs"

  tags = {
    Name = "alb-access-logs"
  }
}

resource "aws_s3_bucket_public_access_block" "alb_logs" {
  bucket = aws_s3_bucket.alb_logs.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_lb" "main" {
  name               = "app-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.web.id]
  subnets            = var.public_subnet_ids

  # FIX 6: Access logging enabled
  access_logs {
    bucket  = aws_s3_bucket.alb_logs.id
    prefix  = "alb-logs"
    enabled = true
  }

  tags = {
    Name = "app-alb"
  }
}
