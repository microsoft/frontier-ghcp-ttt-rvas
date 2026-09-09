# INSECURE TERRAFORM — This file has 6 intentional security issues.
# Use Copilot to find and fix all of them.

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

# ISSUE 1: Security group allows ALL traffic from anywhere
resource "aws_security_group" "web" {
  name        = "web-sg"
  description = "Security group for web tier"

  ingress {
    description = "Allow all traffic"
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ISSUE 2: Database password hardcoded in plain text
resource "aws_db_instance" "main" {
  identifier        = "production-db"
  engine            = "postgres"
  engine_version    = "15"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  db_name           = "appdb"

  username = "admin"
  password = "SuperSecret123!"  # Hardcoded password!

  # ISSUE 5: Storage is NOT encrypted
  # storage_encrypted = true  # This line is commented out

  vpc_security_group_ids = [aws_security_group.web.id]
  skip_final_snapshot    = true
}

# ISSUE 3: S3 bucket with public read access
resource "aws_s3_bucket" "data" {
  bucket = "my-app-data-bucket"
}

resource "aws_s3_bucket_acl" "data_acl" {
  bucket = aws_s3_bucket.data.id
  acl    = "public-read"  # Public access!
}

# No public access block — bucket is open to the internet

# ISSUE 4: IAM policy with full admin access
resource "aws_iam_policy" "app_policy" {
  name        = "app-policy"
  description = "Application IAM policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "*"        # Full admin access!
        Resource = "*"        # All resources!
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

# ISSUE 6: ALB without access logging
resource "aws_lb" "main" {
  name               = "app-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.web.id]
  subnets            = ["subnet-12345", "subnet-67890"]

  # No access_logs block — missing audit trail
}
