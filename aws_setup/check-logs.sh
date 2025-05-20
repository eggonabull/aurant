#!/bin/bash
set -e
set -x

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "Error: AWS CLI is not installed"
    exit 1
fi

# Check if required environment variables are set
if [ -z "$AWS_REGION" ]; then
    echo "Error: AWS_REGION is not set"
    exit 1
fi

# Check frontend log group
echo "Checking frontend log group..."
aws logs describe-log-groups --log-group-name-prefix "/ecs/aurant-dev-frontend" --region $AWS_REGION

# Check backend log group
echo "Checking backend log group..."
aws logs describe-log-groups --log-group-name-prefix "/ecs/aurant-dev-backend" --region $AWS_REGION

# Check IAM permissions for CloudWatch
echo "Checking IAM permissions..."
aws iam get-role --role-name aurant-dev-ecs-task-execution-role --region $AWS_REGION
