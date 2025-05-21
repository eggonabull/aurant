FROM node:24-alpine

WORKDIR /app

RUN npm install --update npm

# Install dependencies and TypeScript
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npx prisma generate
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
