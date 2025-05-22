module.exports = {
  "family": "aurant-dev-backend",
  "taskRoleArn": `arn:aws:iam::${process.env.AWS_ACCOUNT_ID}:role/aurant-dev-ecs-task-role`,
  "executionRoleArn": `arn:aws:iam::${process.env.AWS_ACCOUNT_ID}:role/aurant-dev-ecs-task-execution-role`,
  "networkMode": "awsvpc",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": `${process.env.ECR_REGISTRY}/aurant-dev-backend:${process.env.IMAGE_TAG}`,
      "portMappings": [
        {
          "containerPort": 8080,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "environment": [
        {
          "name": "RUST_LOG",
          "value": "info"
        },
        {
          "name": "RUST_BACKTRACE",
          "value": "full"
        },
        {
          "name": "DATABASE_URL",
          "value": `${process.env.DATABASE_URL}`
        }
      ],
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -v -f http://localhost:8080/health || exit 1"],
        "interval": 30,
        "timeout": 15,
        "retries": 3,
        "startPeriod": 30
      },
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/aurant-dev-backend",
          "awslogs-region": `${process.env.AWS_REGION}`,
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ],
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "runtimePlatform": {
    "operatingSystemFamily": "LINUX"
  }
}

var ConfigurationJSON = JSON.stringify(module.exports);
const config = module.exports;

const jsonConfig = JSON.parse(JSON.stringify(ConfigurationJSON))

console.log(jsonConfig)