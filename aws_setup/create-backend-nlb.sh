#!/bin/bash

# Source environment variables from .env file in parent directory
source ../.env

# Get VPC ID
VPC_ID=$(aws ec2 describe-vpcs --filters "Name=isDefault,Values=true" --query 'Vpcs[0].VpcId' --output text)

# Create target group for backend
BACKEND_TG_ARN=$(aws elbv2 create-target-group \
    --name aurant-backend-tg \
    --protocol TCP \
    --port 8080 \
    --vpc-id $VPC_ID \
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
BACKEND_NLB_ARN=$(aws elbv2 create-load-balancer \
    --name aurant-nlb \
    --subnets ${SUBNET_ID} \
    --security-groups $BACKEND_SG \
    --type network \
    --scheme internal \
    --query 'LoadBalancers[0].LoadBalancerArn' \
    --output text)

echo "NLB ARN: $BACKEND_NLB_ARN"

# Wait for NLB to be created
# sleep 5

# Get NLB DNS name
BACKEND_NLB_DNS=$(aws elbv2 describe-load-balancers \
    --load-balancer-arns $NLB_ARN \
    --query 'LoadBalancers[0].DNSName' \
    --output text)

echo "NLB DNS Name: $BACKEND_NLB_DNS"

# Create listener for TCP traffic
aws elbv2 create-listener \
    --load-balancer-arn $BACKEND_NLB_ARN \
    --protocol TCP \
    --port 8080 \
    --default-actions Type=forward,TargetGroupArn=$BACKEND_TG_ARN

LISTENER_ARN=$(aws elbv2 describe-listeners \
    --load-balancer-arn $BACKEND_NLB_ARN \
    --query 'Listeners[0].ListenerArn' \
    --output text)

echo "Listener ARN: $LISTENER_ARN"

# Output important information
echo "Network Load Balancer setup complete!"


