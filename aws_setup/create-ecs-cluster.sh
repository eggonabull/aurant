#!/bin/bash
set -x
set -e
cd "$(dirname "$0")"

# Source environment variables
source ../.env


if [ -z "$AWS_REGION" ]; then
    AWS_REGION=$AWS_DEFAULT_REGION
fi

if [ -z "$AWS_REGION" ]; then
    echo "Error: AWS_REGION is not set"
    exit 1
fi

if [ -z "$SUBNET_ID" ]; then
    echo "Error: SUBNET_ID is not set"
    exit 1
fi

AWS_ACCOUNT_ID=$(aws --region $AWS_REGION sts get-caller-identity --query 'Account' --output text)

if [ -z "$AWS_ACCOUNT_ID" ]; then
    echo "Error: AWS_ACCOUNT_ID is not set"
    exit 1
fi

# Set AWS region
export AWS_DEFAULT_REGION=us-west-2

# Create IAM roles for ECS tasks and execution
echo "Creating IAM roles..."

TASK_EXECUTION_ROLE=$(aws --region $AWS_REGION iam get-role --role-name aurant-dev-ecs-task-execution-role --query 'Role.Arn' --output text)

if [ -z "$TASK_EXECUTION_ROLE" ]; then
    # Create task execution role
    aws --region $AWS_REGION iam create-role --role-name aurant-dev-ecs-task-execution-role \
    --assume-role-policy-document '{"Version": "2012-10-17","Statement": [{"Sid": "","Effect": "Allow","Principal": {"Service": "ecs-tasks.amazonaws.com"},"Action": "sts:AssumeRole"}]}'

    aws --region $AWS_REGION iam attach-role-policy --role-name aurant-dev-ecs-task-execution-role \
    --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy

    # Create ECS Task Role
    aws --region $AWS_REGION iam create-role \
    --role-name aurant-dev-ecs-task-role \
    --assume-role-policy-document '{
        "Version": "2012-10-17",
        "Statement": [{
            "Sid": "",
            "Effect": "Allow",
            "Principal": {
                "Service": "ecs-tasks.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }]
    }'
fi

    # Create ECS cluster
echo "Creating ECS cluster..."
aws --region $AWS_REGION ecs create-cluster \
    --cluster-name aurant \
    --capacity-providers FARGATE \
    --default-capacity-provider-strategy capacityProvider=FARGATE

# Get default VPC ID
VPC_ID=$(aws --region $AWS_REGION ec2 describe-vpcs --filters "Name=isDefault,Values=true" --query 'Vpcs[0].VpcId' --output text)

# Check if frontend security group already exists
FRONTEND_SG=$(aws --region $AWS_REGION ec2 describe-security-groups --filters "Name=group-name,Values=aurant-frontend-sg" --query 'SecurityGroups[0].GroupId' --output text)

if [ -z "$FRONTEND_SG" ]; then
    # Create frontend security group
    FRONTEND_SG=$(aws --region $AWS_REGION ec2 create-security-group \
        --group-name aurant-frontend-sg \
        --description "Security group for aurant frontend" \
        --vpc-id $VPC_ID \
        --query 'GroupId' \
        --output text)
fi

# Check if backend security group already exists
BACKEND_SG=$(aws --region $AWS_REGION ec2 describe-security-groups --filters "Name=group-name,Values=aurant-backend-sg" --query 'SecurityGroups[0].GroupId' --output text)

if [ -z "$BACKEND_SG" ]; then
    # Create backend security group
    BACKEND_SG=$(aws --region $AWS_REGION ec2 create-security-group \
        --group-name aurant-backend-sg \
        --description "Security group for aurant backend" \
        --vpc-id $VPC_ID \
        --query 'GroupId' \
        --output text)
fi

# Allow inbound traffic for frontend
if [ -z "$FRONTEND_SG" ]; then
    aws --region $AWS_REGION ec2 authorize-security-group-ingress \
        --group-id $FRONTEND_SG \
        --protocol tcp \
        --port 3000 \
        --cidr 0.0.0.0/0
fi

# Allow inbound traffic for backend
if [ -z "$BACKEND_SG" ]; then
    aws --region $AWS_REGION ec2 authorize-security-group-ingress \
        --group-id $BACKEND_SG \
        --protocol tcp \
        --port 8080 \
        --cidr 0.0.0.0/0
fi

# Allow communication between frontend and backend
if [ -z "$FRONTEND_SG" ] && [ -z "$BACKEND_SG" ]; then
    aws --region $AWS_REGION ec2 authorize-security-group-ingress \
        --group-id $FRONTEND_SG \
        --protocol tcp \
        --port 8080 \
        --source-group $BACKEND_SG

    aws --region $AWS_REGION ec2 authorize-security-group-ingress \
        --group-id $BACKEND_SG \
        --protocol tcp \
        --port 3000 \
        --source-group $FRONTEND_SG
fi

# Register task definitions
echo "Registering task definitions..."

# Get AWS credentials
ECR_REGISTRY=$(aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com)
IMAGE_TAG=$(git rev-parse HEAD)

# Create task definition files from templates
echo "Creating task definition files from templates..."

# Frontend task definition
sed -e "s|\${AWS_ACCOUNT_ID}|$AWS_ACCOUNT_ID|g" \
    -e "s|\${ECR_REGISTRY}|$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com|g" \
    -e "s|\${IMAGE_TAG}|$IMAGE_TAG|g" \
    -e "s|\${AWS_REGION}|$AWS_REGION|g" \
    task_definitions/frontend.json.template > task_definitions/frontend-task-definition.json

# Backend task definition
sed -e "s|\${AWS_ACCOUNT_ID}|$AWS_ACCOUNT_ID|g" \
    -e "s|\${ECR_REGISTRY}|$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com|g" \
    -e "s|\${IMAGE_TAG}|$IMAGE_TAG|g" \
    -e "s|\${AWS_REGION}|$AWS_REGION|g" \
    task_definitions/backend.json.template > task_definitions/backend-task-definition.json

# Create Frontend Task Definition
aws --region $AWS_REGION ecs register-task-definition \
    --cli-input-json file://task_definitions/frontend-task-definition.json

# Create Backend Task Definition
aws --region $AWS_REGION ecs register-task-definition \
    --cli-input-json file://task_definitions/backend-task-definition.json

# Get latest task definition revisions
FRONTEND_TASK_DEFINITION=$(aws --region $AWS_REGION ecs describe-task-definition --task-definition aurant-dev-frontend --query 'taskDefinition.taskDefinitionArn' --output text)
BACKEND_TASK_DEFINITION=$(aws --region $AWS_REGION ecs describe-task-definition --task-definition aurant-dev-backend --query 'taskDefinition.taskDefinitionArn' --output text)

# Get target group ARNs
FRONTEND_TG_ARN=$(aws --region $AWS_REGION elbv2 describe-target-groups --names aurant-frontend-tg --query 'TargetGroups[0].TargetGroupArn' --output text)
BACKEND_TG_ARN=$(aws --region $AWS_REGION elbv2 describe-target-groups --names aurant-backend-tg --query 'TargetGroups[0].TargetGroupArn' --output text)

echo "Cluster setup complete!"
echo "Cluster name: aurant"

sleep 5

# Create frontend service
aws --region $AWS_REGION ecs create-service \
    --cluster aurant \
    --service-name frontend-service \
    --task-definition $FRONTEND_TASK_DEFINITION \
    --desired-count 1 \
    --launch-type FARGATE \
    --network-configuration "awsvpcConfiguration={subnets=[${SUBNET_ID}],securityGroups=[$FRONTEND_SG],assignPublicIp=ENABLED}" \
    --load-balancers "targetGroupArn=${FRONTEND_TG_ARN},containerName=frontend,containerPort=3000" \
    --health-check-grace-period-seconds 30

sleep 5

# Create backend service
aws --region $AWS_REGION ecs create-service \
    --cluster aurant \
    --service-name backend-service \
    --task-definition $BACKEND_TASK_DEFINITION \
    --desired-count 1 \
    --launch-type FARGATE \
    --network-configuration "awsvpcConfiguration={subnets=[${SUBNET_ID}],securityGroups=[$BACKEND_SG],assignPublicIp=ENABLED}" \
    --load-balancers "targetGroupArn=${BACKEND_TG_ARN},containerName=backend,containerPort=8080" \
    --health-check-grace-period-seconds 30

# Output important information
echo "Setup complete!"
echo "Cluster name: aurant"
echo "Frontend service: frontend-service"
echo "Backend service: backend-service"
echo "Frontend security group: $FRONTEND_SG"
echo "Backend security group: $BACKEND_SG"
