#!/bin/bash

# This script will analyze your AWS security groups to ensure proper connectivity between ECS and RDS

# Get the ECS task security group ID
ECS_SG_ID=$(aws ec2 describe-security-groups --filters "Name=tag:aws:cloudformation:logical-id,Values=EcsTaskSecurityGroup" --query 'SecurityGroups[*].GroupId' --output text)
if [ -z "$ECS_SG_ID" ]; then
    echo "Error: Could not find ECS task security group"
    exit 1
fi

echo "Found ECS Task Security Group: $ECS_SG_ID"

# Get the RDS security group ID
RDS_SG_ID=$(aws ec2 describe-security-groups --filters "Name=tag:aws:cloudformation:logical-id,Values=RdsSecurityGroup" --query 'SecurityGroups[*].GroupId' --output text)
if [ -z "$RDS_SG_ID" ]; then
    echo "Error: Could not find RDS security group"
    exit 1
fi

echo "Found RDS Security Group: $RDS_SG_ID"

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
