output "bucket_name" {
  value = aws_s3_bucket.crop_bucket.bucket
}

output "security_group_id" {
  value = aws_security_group.crop_sg.id
}