#!/bin/bash

# This script will analyze your AWS security groups to ensure proper connectivity between ECS and RDS

# Get all security groups with detailed information
SGS=$(aws ec2 describe-security-groups --query 'SecurityGroups[*].[GroupId,GroupName,Description,Tags[?Key==`Name`].Value[]]' --output text)

# Show all security groups with their details
echo "Listing all security groups with details:"
echo "$SGS" | column -t

echo "\nPlease identify:"
echo "1. The security group used by your ECS tasks"
echo "2. The security group used by your RDS instance"

echo "\nIf you can provide the security group IDs, I can analyze their rules:"

echo "\nAnalyzing ECS Task Security Group Inbound Rules:"
aws ec2 describe-security-groups --group-ids "$ECS_SG_ID" --query 'SecurityGroups[*].IpPermissions[*].[IpProtocol,FromPort,ToPort,UserIdGroupPairs[*].GroupId]' --output text

echo "\nAnalyzing RDS Security Group Inbound Rules:"
aws ec2 describe-security-groups --group-ids "$RDS_SG_ID" --query 'SecurityGroups[*].IpPermissions[*].[IpProtocol,FromPort,ToPort,UserIdGroupPairs[*].GroupId]' --output text

echo "\nChecking if ECS security group can access RDS:"
if aws ec2 describe-security-groups --group-ids "$RDS_SG_ID" --filters "Name=ip-permission.group-id,Values=$ECS_SG_ID" --query 'SecurityGroups[*].IpPermissions[*].[IpProtocol,FromPort,ToPort]' --output text | grep -q 'tcp 5432'; then
    echo "✅ ECS has access to RDS on port 5432"
else
    echo "❌ ECS does not have access to RDS on port 5432"
    echo "You should add an inbound rule to the RDS security group that allows:"
    echo "- Protocol: TCP"
    echo "- Port: 5432"
    echo "- Source: $ECS_SG_ID"
fi

echo "\nChecking if RDS security group is properly configured:"
if aws ec2 describe-security-groups --group-ids "$RDS_SG_ID" --query 'SecurityGroups[*].IpPermissions[*].[IpProtocol,FromPort,ToPort]' --output text | grep -q 'tcp 5432'; then
    echo "✅ RDS security group has port 5432 open"
else
    echo "❌ RDS security group does not have port 5432 open"
fi
