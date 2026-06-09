resource "aws_s3_bucket" "crop_bucket" {
bucket = "tomato-disease-shanmugapriya-2026"
  tags = {
    Name = "CropDiseaseBucket"
  }
}

resource "aws_security_group" "crop_sg" {
  name = "crop-disease-sg"

  ingress {
    from_port   = 5001
    to_port     = 5001
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