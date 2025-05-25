module.exports = {
    "family": "aurant-dev-frontend",
    "taskRoleArn": `arn:aws:iam::${process.env.AWS_ACCOUNT_ID}:role/aurant-dev-ecs-task-role`,
    "executionRoleArn": `arn:aws:iam::${process.env.AWS_ACCOUNT_ID}:role/aurant-dev-ecs-task-execution-role`,
    "networkMode": "awsvpc",
    "containerDefinitions": [
      {
        "name": "frontend",
        "image": `${process.env.ECR_REGISTRY}/aurant-dev-frontend:${process.env.IMAGE_TAG}`,
        "portMappings": [
          {
            "hostPort": 3000,
            "containerPort": 3000,
            "protocol": "tcp"
          }
        ],
        "essential": true,
        "environment": [
          {
            "name": "NODE_ENV",
            "value": "production"
          }
        ],
        "healthCheck": {
          "command": ["CMD-SHELL", "curl -v -f http://localhost:3000/health || exit 1"],
          "interval": 60,
          "timeout": 15,
          "retries": 3,
          "startPeriod": 60
        },
        "logConfiguration": {
          "logDriver": "awslogs",
          "options": {
            "awslogs-group": "/ecs/aurant-dev-frontend",
            "awslogs-region": `${process.env.AWS_REGION}`,
            "awslogs-stream-prefix": "ecs"
          }
        }
      }
    ],
    "requiresCompatibilities": ["FARGATE"],
    "cpu": "256",
    "memory": "512",
    "runtimePlatform": {
      "operatingSystemFamily": "LINUX"
    }
  }
  
  
  var ConfigurationJSON = JSON.stringify(module.exports);
  const config = module.exports;
  
  const jsonConfig = JSON.parse(JSON.stringify(ConfigurationJSON))
  
  console.log(jsonConfig)