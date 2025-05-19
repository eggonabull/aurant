#!/bin/bash
set -x
set -e
cd "$(dirname "$0")"

# Source environment variables from .env file in parent directory
source ../.env

# Check required environment variables
if [ -z "$ACM_CERTIFICATE_ARN" ]; then
    echo "Error: ACM_CERTIFICATE_ARN is not set"
    exit 1
fi

if [ -z "$AWS_DEFAULT_REGION" ]; then
    echo "Error: AWS_DEFAULT_REGION is not set"
    exit 1
fi

if [ -z "$FRONTEND_SG" ]; then
    echo "Error: FRONTEND_SG is not set"
    exit 1
fi

# Verify ACM certificate status
CERT_STATUS=$(aws --region $AWS_REGION acm describe-certificate --certificate-arn $ACM_CERTIFICATE_ARN --query 'Certificate.Status' --output text)
if [ "$CERT_STATUS" != "ISSUED" ]; then
    echo "Error: ACM certificate status is not ISSUED. Current status: $CERT_STATUS"
    exit 1
fi

# Get certificate domain name
CERT_DOMAIN=$(aws --region $AWS_REGION acm describe-certificate --certificate-arn $ACM_CERTIFICATE_ARN --query 'Certificate.DomainName' --output text)
if [ -z "$CERT_DOMAIN" ]; then
    echo "Error: Could not get certificate domain name"
    exit 1
fi

if [ "$CERT_DOMAIN" != "aurant.dev" ]; then
    echo "Warning: Certificate domain ($CERT_DOMAIN) does not match expected domain (aurant.dev)"
fi

# Get VPC ID and subnets
VPC_ID=$(aws --region $AWS_REGION ec2 describe-vpcs --filters "Name=isDefault,Values=true" --query 'Vpcs[0].VpcId' --output text)

# Get all available subnets in the VPC
SUBNETS=$(aws --region $AWS_REGION ec2 describe-subnets --filters "Name=vpc-id,Values=$VPC_ID" --query 'Subnets[*].[SubnetId,AvailabilityZone]' --output json)

# Extract at least 2 subnets from different AZs
SUBNET1=$(echo $SUBNETS | jq -r '.[0][0]')
SUBNET2=$(echo $SUBNETS | jq -r '.[1][0]')

if [ -z "$SUBNET1" ] || [ -z "$SUBNET2" ]; then
    echo "Error: Could not find at least 2 subnets in different AZs"
    echo "Available subnets: $SUBNETS"
    exit 1
fi



# Create target group for frontend with IP target type for FARGATE compatibility
FRONTEND_TG_ARN=$(aws --region $AWS_REGION elbv2 create-target-group \
    --name aurant-frontend-tg \
    --protocol HTTP \
    --port 3000 \
    --vpc-id $VPC_ID \
    --target-type ip \
    --health-check-protocol HTTP \
    --health-check-port traffic-port \
    --health-check-path /health \
    --health-check-interval-seconds 30 \
    --health-check-timeout-seconds 5 \
    --healthy-threshold-count 2 \
    --unhealthy-threshold-count 2 \
    --query 'TargetGroups[0].TargetGroupArn' \
    --output text)

if [ $? -ne 0 ]; then
    echo "Error creating target group"
    exit 1
fi

echo "Frontend Target Group ARN: $FRONTEND_TG_ARN"
# Escape forward slashes in the ARN
ESCAPED_TG_ARN=$(echo "$FRONTEND_TG_ARN" | sed 's|/|\\/|g')

# Create Application Load Balancer
ALB_ARN=$(aws --region $AWS_REGION elbv2 create-load-balancer \
    --name aurant-alb \
    --subnets $SUBNET1 $SUBNET2 \
    --security-groups $FRONTEND_SG \
    --type application \
    --scheme internet-facing \
    --query 'LoadBalancers[0].LoadBalancerArn' \
    --output text)

if [ $? -ne 0 ]; then
    echo "Error creating load balancer"
    exit 1
fi

# Get ALB DNS name
ALB_DNS=$(aws --region $AWS_REGION elbv2 describe-load-balancers \
    --load-balancer-arns $ALB_ARN \
    --query 'LoadBalancers[0].DNSName' \
    --output text)

if [ $? -ne 0 ]; then
    echo "Error getting ALB DNS name"
    exit 1
fi

# Create HTTPS listener with ACM certificate
# First create the forward config file with the actual ARN

cat forward-config-template.json | sed "s/{{TARGET_GROUP_ARN}}/$ESCAPED_TG_ARN/g" > forward-config.json

HTTPS_LISTENER_ARN=$(aws --region $AWS_REGION elbv2 create-listener \
    --load-balancer-arn $ALB_ARN \
    --protocol HTTPS \
    --port 443 \
    --certificates CertificateArn=$ACM_CERTIFICATE_ARN \
    --default-actions file://forward-config.json \
    --query 'Listeners[0].ListenerArn' \
    --output text)

if [ $? -ne 0 ]; then
    echo "Error creating HTTPS listener"
    exit 1
fi

# Create HTTP listener for redirecting to HTTPS
# First create the redirect config file with the actual ARN
# Escape forward slashes in the ARN
cat redirect-config-template.json | sed "s/{{TARGET_GROUP_ARN}}/$ESCAPED_TG_ARN/g" > redirect-config.json

HTTP_LISTENER_ARN=$(aws --region $AWS_REGION elbv2 create-listener \
    --load-balancer-arn $ALB_ARN \
    --protocol HTTP \
    --port 80 \
    --default-actions file://redirect-config.json \
    --query 'Listeners[0].ListenerArn' \
    --output text)

if [ $? -ne 0 ]; then
    echo "Error creating HTTP listener"
    exit 1
fi

# Wait for listeners to be created
sleep 5

# Verify listeners are active
HTTPS_LISTENER_STATUS=$(aws --region $AWS_REGION elbv2 describe-listeners --listener-arns $HTTPS_LISTENER_ARN --query 'Listeners[0].State.Code' --output text)
HTTP_LISTENER_STATUS=$(aws --region $AWS_REGION elbv2 describe-listeners --listener-arns $HTTP_LISTENER_ARN --query 'Listeners[0].State.Code' --output text)

if [ "$HTTPS_LISTENER_STATUS" != "active" ] || [ "$HTTP_LISTENER_STATUS" != "active" ]; then
    echo "Error: One or more listeners failed to become active"
    echo "HTTPS Listener Status: $HTTPS_LISTENER_STATUS"
    echo "HTTP Listener Status: $HTTP_LISTENER_STATUS"
    exit 1
fi

# Output important information
echo "Application Load Balancer setup complete!"
echo "ALB Name: aurant-alb"
echo "ALB DNS Name: $ALB_DNS"
echo "Target Group ARN: $FRONTEND_TG_ARN"
echo "HTTPS Listener ARN: $HTTPS_LISTENER_ARN"
echo "HTTP Listener ARN: $HTTP_LISTENER_ARN"

# Add ARNs to .env file
if [ -f .env ]; then
    echo "FRONTEND_TG_ARN=$FRONTEND_TG_ARN" >> .env
    echo "ALB_ARN=$ALB_ARN" >> .env
    echo "ALB_DNS=$ALB_DNS" >> .env
    echo "HTTPS_LISTENER_ARN=$HTTPS_LISTENER_ARN" >> .env
    echo "HTTP_LISTENER_ARN=$HTTP_LISTENER_ARN" >> .env
fi

# Clean up temporary files
rm -f forward-config.json redirect-config.json
