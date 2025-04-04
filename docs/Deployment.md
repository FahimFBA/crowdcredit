# Deployment Guide

This document outlines how to deploy the CrowdCredit application using Docker and explains the CI/CD setup.

## Docker Setup

### Prerequisites
- Docker and Docker Compose installed on your system
- Node.js 20.x (for local development)
- Docker Hub account (for deployment)

### Development Environment

To run the application in development mode with hot-reloading:

```bash
docker compose up dev
```

This will:
- Build the development Docker image
- Start the development server on port 5173
- Enable hot-reloading for local development
- Mount your local files into the container

### Production Environment

To build and run the production version:

```bash
docker compose up prod
```

This will:
- Build an optimized production image
- Serve the static files using Nginx
- Run on port 80

### Building Docker Images Manually

Development image:
```bash
docker build -f Dockerfile.dev -t crowdcredit:dev .
docker run -p 5173:5173 crowdcredit:dev
```

Production image:
```bash
docker build -t crowdcredit:prod .
docker run -p 80:80 crowdcredit:prod
```

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment.

### CI Workflow (.github/workflows/ci.yml)

Triggered on:
- Push to main branch
- Pull requests to main branch

Steps:
1. Install dependencies
2. Run ESLint for code quality
3. Type checking with TypeScript
4. Build verification
5. Cache build artifacts

### Deployment Workflow (.github/workflows/deploy.yml)

Triggered on:
- Push to main branch
- Manual trigger (workflow_dispatch)

Steps:
1. Build the application
2. Build Docker image
3. Push to Docker Hub
4. Cache layers for faster builds

### Required Secrets

The following secrets need to be set in your GitHub repository:

- `DOCKERHUB_USERNAME`: Your Docker Hub username
- `DOCKERHUB_TOKEN`: Your Docker Hub access token

## Environment Variables

The application uses the following environment variables:

```env
NODE_ENV=development|production
# Add other environment variables as needed
```

Copy `.env.example` to `.env` and update the values accordingly.

## Deployment Best Practices

1. **Version Control**
   - Tag releases with semantic versioning
   - Use descriptive commit messages

2. **Docker Images**
   - Use multi-stage builds to minimize image size
   - Implement layer caching
   - Regularly update base images

3. **Security**
   - Keep dependencies updated
   - Use security scanning in CI/CD
   - Follow the principle of least privilege

4. **Monitoring**
   - Implement health checks
   - Set up logging
   - Monitor resource usage

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Verify Node.js version compatibility
   - Check for missing dependencies
   - Ensure correct environment variables

2. **Docker Issues**
   - Clear Docker cache: `docker system prune`
   - Check Docker logs: `docker logs [container_id]`
   - Verify port availability

3. **Deployment Failures**
   - Check GitHub Actions logs
   - Verify Docker Hub credentials
   - Ensure sufficient permissions

For additional support, please create an issue in the GitHub repository.
