#!/bin/bash
set -x
set -e
cd "$(dirname "$0")"

# Source environment variables
source ../.env

# Create the task execution role
aws iam create-role \
    --role-name aurant-dev-ecs-task-execution-role \
    --assume-role-policy-document '{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "",
                "Effect": "Allow",
                "Principal": {
                    "Service": "ecs-tasks.amazonaws.com"
                },
                "Action": "sts:AssumeRole"
            }
        ]
    }'

# Attach policies to the task execution role
aws iam attach-role-policy \
    --role-name aurant-dev-ecs-task-execution-role \
    --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy

# Create the task role
aws iam create-role \
    --role-name aurant-dev-ecs-task-role \
    --assume-role-policy-document '{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "",
                "Effect": "Allow",
                "Principal": {
                    "Service": "ecs-tasks.amazonaws.com"
                },
                "Action": "sts:AssumeRole"
            }
        ]
    }'

# Attach necessary policies to the task role
aws iam attach-role-policy \
    --role-name aurant-dev-ecs-task-role \
    --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess

aws iam attach-role-policy \
    --role-name aurant-dev-ecs-task-role \
    --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess