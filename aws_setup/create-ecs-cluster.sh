#!/bin/bash

# Source environment variables
source ../.env

# Set AWS region
export AWS_DEFAULT_REGION=us-west-2

# Create ECS cluster
echo "Creating ECS cluster..."
aws ecs create-cluster --cluster-name aurant --capacity-providers FARGATE

# Create IAM roles for ECS tasks and execution
echo "Creating IAM roles..."

# Create task execution role
aws iam create-role --role-name aurant-dev-ecs-task-execution-role \
    --assume-role-policy-document '{"Version": "2012-10-17","Statement": [{"Sid": "","Effect": "Allow","Principal": {"Service": "ecs-tasks.amazonaws.com"},"Action": "sts:AssumeRole"}]}'

aws iam attach-role-policy --role-name aurant-dev-ecs-task-execution-role \
    --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy

# Create task role
aws iam create-role --role-name aurant-dev-ecs-task-role \
    --assume-role-policy-document '{"Version": "2012-10-17","Statement": [{"Sid": "","Effect": "Allow","Principal": {"Service": "ecs-tasks.amazonaws.com"},"Action": "sts:AssumeRole"}]}'

# Create security groups
echo "Creating security groups..."

# Get default VPC ID
VPC_ID=$(aws ec2 describe-vpcs --filters "Name=isDefault,Values=true" --query 'Vpcs[0].VpcId' --output text)

# Create frontend security group
FRONTEND_SG=$(aws ec2 create-security-group \
    --group-name aurant-frontend-sg \
    --description "Security group for aurant frontend" \
    --vpc-id $VPC_ID \
    --query 'GroupId' \
    --output text)

# Create backend security group
BACKEND_SG=$(aws ec2 create-security-group \
    --group-name aurant-backend-sg \
    --description "Security group for aurant backend" \
    --vpc-id $VPC_ID \
    --query 'GroupId' \
    --output text)

# Allow inbound traffic for frontend
aws ec2 authorize-security-group-ingress \
    --group-id $FRONTEND_SG \
    --protocol tcp \
    --port 3000 \
    --cidr 0.0.0.0/0

# Allow inbound traffic for backend
aws ec2 authorize-security-group-ingress \
    --group-id $BACKEND_SG \
    --protocol tcp \
    --port 8080 \
    --cidr 0.0.0.0/0

# Allow communication between frontend and backend
aws ec2 authorize-security-group-ingress \
    --group-id $FRONTEND_SG \
    --protocol tcp \
    --port 8080 \
    --source-group $BACKEND_SG

aws ec2 authorize-security-group-ingress \
    --group-id $BACKEND_SG \
    --protocol tcp \
    --port 3000 \
    --source-group $FRONTEND_SG

# Create ECS services
echo "Creating ECS services..."

# Create frontend service
aws ecs create-service \
    --cluster aurant \
    --service-name frontend-service \
    --task-definition aurant-dev-frontend:1 \
    --desired-count 1 \
    --launch-type FARGATE \
    --network-configuration "awsvpcConfiguration={subnets=[${SUBNET_ID}],securityGroups=[$FRONTEND_SG],assignPublicIp=ENABLED}" \
    --load-balancers "targetGroupArn=${FRONTEND_TG_ARN},type=application" \
    --health-check-grace-period-seconds 30

# Create backend service
aws ecs create-service \
    --cluster aurant \
    --service-name backend-service \
    --task-definition aurant-dev-backend:1 \
    --desired-count 1 \
    --launch-type FARGATE \
    --network-configuration "awsvpcConfiguration={subnets=[${SUBNET_ID}],securityGroups=[$BACKEND_SG],assignPublicIp=ENABLED}" \
    --health-check-grace-period-seconds 30

# Output important information
echo "Setup complete!"
echo "Cluster name: aurant"
echo "Frontend service: frontend-service"
echo "Backend service: backend-service"
echo "Frontend security group: $FRONTEND_SG"
echo "Backend security group: $BACKEND_SG"
