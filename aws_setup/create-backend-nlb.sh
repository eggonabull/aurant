#!/bin/bash
set -x
set -e
cd "$(dirname "$0")"

# Source environment variables from .env file in parent directory
source ../.env

if [ -z "$SUBNET_ID" ]; then
    echo "Error: SUBNET_ID is not set"
    exit 1
fi


# Get VPC ID
VPC_ID=$(aws --region $AWS_REGION ec2 describe-vpcs --filters "Name=isDefault,Values=true" --query 'Vpcs[0].VpcId' --output text)

if [ -z "$VPC_ID" ]; then
    echo "Error: VPC ID is not set"
    exit 1
fi

# Check if a backend subnet exists
MAIN_SUBNET=$(aws --region $AWS_REGION ec2 describe-subnets --filters "Name=subnet-id,Values=$SUBNET_ID" --query 'Subnets[0].SubnetId' --output text)

# Check if MAIN_SUBNET is empty or "None"
if [ -z "$MAIN_SUBNET" ] || [ "$MAIN_SUBNET" == "None" ]; then
    # Create a backend subnet
    MAIN_SUBNET=$(aws --region $AWS_REGION ec2 create-subnet \
        --vpc-id $VPC_ID \
        --cidr-block 10.0.1.0/24 \
        --availability-zone us-west-2a \
        --query 'Subnet.SubnetId' \
        --output text)
fi


# Create target group for backend with IP target type for FARGATE compatibility
BACKEND_TG_ARN=$(aws --region $AWS_REGION elbv2 create-target-group \
    --name aurant-backend-tg \
    --protocol TCP \
    --port 8080 \
    --vpc-id $VPC_ID \
    --target-type ip \
    --health-check-protocol TCP \
    --health-check-port traffic-port \
    --health-check-interval-seconds 30 \
    --health-check-timeout-seconds 5 \
    --healthy-threshold-count 2 \
    --unhealthy-threshold-count 2 \
    --query 'TargetGroups[0].TargetGroupArn' \
    --output text)

echo "Backend Target Group ARN: $BACKEND_TG_ARN"

# Create Network Load Balancer for backend
BACKEND_NLB_ARN=$(aws --region $AWS_REGION elbv2 create-load-balancer \
    --name aurant-nlb \
    --subnets $MAIN_SUBNET \
    --security-groups $BACKEND_SG \
    --type network \
    --scheme internal \
    --query 'LoadBalancers[0].LoadBalancerArn' \
    --output text)

echo "NLB ARN: $BACKEND_NLB_ARN"

# Wait for NLB to be created
# sleep 5

# Get NLB DNS name
BACKEND_NLB_DNS=$(aws --region $AWS_REGION elbv2 describe-load-balancers \
    --load-balancer-arns $BACKEND_NLB_ARN \
    --query 'LoadBalancers[0].DNSName' \
    --output text)

echo "NLB DNS Name: $BACKEND_NLB_DNS"

# Create listener for TCP traffic
aws --region $AWS_REGION elbv2 create-listener \
    --load-balancer-arn $BACKEND_NLB_ARN \
    --protocol TCP \
    --port 8080 \
    --default-actions Type=forward,TargetGroupArn=$BACKEND_TG_ARN

LISTENER_ARN=$(aws --region $AWS_REGION elbv2 describe-listeners \
    --load-balancer-arn $BACKEND_NLB_ARN \
    --query 'Listeners[0].ListenerArn' \
    --output text)

echo "Listener ARN: $LISTENER_ARN"

# Output important information
echo "Network Load Balancer setup complete!"


