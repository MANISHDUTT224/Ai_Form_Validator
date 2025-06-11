An AI-powered web application that automatically validates compliance forms using NLP and document processing. Upload PDFs or documents, extract structured data, and get intelligent validation with suggestions for corrections.

🎯 Overview
The Compliance Form Validator is a full-stack web application designed to streamline compliance document processing. It leverages artificial intelligence to:

Extract structured data from uploaded documents
Validate against predefined templates and business rules
Flag missing fields, inconsistencies, and formatting errors
Suggest intelligent corrections and completions
Generate detailed validation reports

Perfect for organizations dealing with regulatory compliance, form processing, or document validation workflows.
✨ Features
Core Functionality

📤 Multi-format Upload: Support for PDF, DOCX, and image files
🤖 AI-Powered Extraction: Uses Hugging Face Transformers for intelligent data extraction
✅ Smart Validation: Template-based validation with customizable rules
🔍 Error Detection: Identifies missing fields, format issues, and inconsistencies
💡 AI Suggestions: Provides context-aware corrections and completions
📊 Detailed Reports: Generates comprehensive validation reports

User Interface

🖱️ Drag & Drop Upload: Intuitive file upload with preview
📱 Responsive Design: Works seamlessly on desktop and mobile
🎨 Clean UI: Professional interface with clear visual indicators
⚡ Real-time Updates: Live progress tracking during processing
📋 Template Management: Admin interface for managing validation templates

Technical Features

🚀 High Performance: Optimized for fast document processing
🔒 Secure: Secure file handling and data protection
📈 Scalable: Designed to handle multiple concurrent users
🐳 Containerized: Docker support for easy deployment
📝 Well Documented: Comprehensive API documentation

🏗️ Architecture
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │    │  Node.js API    │    │   AI Service    │
│                 │    │                 │    │                 │
│ • File Upload   │◄──►│ • REST API      │◄──►│ • NLP Models    │
│ • Validation UI │    │ • File Processing│    │ • Data Extract  │
│ • Report View   │    │ • Template CRUD │    │ • Validation    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       ▼                       │
         │              ┌─────────────────┐              │
         │              │   PostgreSQL    │              │
         │              │                 │              │
         └──────────────┤ • Templates     │◄─────────────┘
                        │ • Validations   │
                        │ • User Data     │
                        └─────────────────┘
🛠️ Tech Stack
Frontend

React 18 - Modern UI framework
Tailwind CSS - Utility-first styling
Axios - HTTP client for API calls
React Router - Client-side routing
React Hook Form - Form handling and validation

Backend

Node.js - Runtime environment
Express.js - Web application framework
Multer - File upload handling
Prisma - Database ORM
JWT - Authentication

AI/ML

Hugging Face Transformers - Pre-trained NLP models
Python FastAPI - AI service API
PyTorch - Machine learning framework
Tesseract OCR - Optical character recognition

Database

PostgreSQL - Primary database
Redis - Caching and session storage

DevOps

Docker - Containerization
Docker Compose - Multi-container orchestration
Nginx - Reverse proxy and load balancing

🚀 Quick Start
Prerequisites

Node.js 18+ and npm/yarn
Python 3.8+ and pip
PostgreSQL 12+
Docker (optional but recommended)

Option 1: Docker Setup (Recommended)
bash# Clone the repository
git clone https://github.com/yourusername/compliance-form-validator.git
cd compliance-form-validator

# Start all services with Docker Compose
docker-compose up -d

# The application will be available at:
# Frontend: http://localhost:3000
# API: http://localhost:5000
# AI Service: http://localhost:8000
Option 2: Manual Setup
1. Backend Setup
bash# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials and API keys

# Run database migrations
npx prisma migrate dev

# Seed the database with sample templates
npm run seed

# Start the backend server
npm run dev
2. AI Service Setup
bash# Navigate to AI service directory
cd ai-service

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Download required models
python scripts/download_models.py

# Start the AI service
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
3. Frontend Setup
bash# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API endpoints

# Start the development server
npm start
📝 Configuration
Environment Variables
Backend (.env)
env# Database
DATABASE_URL="postgresql://username:password@localhost:5432/compliance_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="24h"

# File Upload
MAX_FILE_SIZE=10485760  # 10MB
UPLOAD_DIR="./uploads"

# AI Service
AI_SERVICE_URL="http://localhost:8000"

# Redis (optional)
REDIS_URL="redis://localhost:6379"
Frontend (.env.local)
envREACT_APP_API_URL=http://localhost:5000/api
REACT_APP_MAX_FILE_SIZE=10485760
REACT_APP_SUPPORTED_FORMATS=.pdf,.docx,.jpg,.png
AI Service (.env)
env# Model Configuration
MODEL_NAME="microsoft/layoutlmv3-base"
DEVICE="cpu"  # or "cuda" for GPU
MAX_BATCH_SIZE=8

# API Configuration
HOST="0.0.0.0"
PORT=8000
📚 API Documentation
Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
Authorization: Bearer <your_jwt_token>
Core Endpoints
Upload and Validate Document
httpPOST /api/documents/validate
Content-Type: multipart/form-data

{
  "file": <binary_file>,
  "template_id": "optional_template_id"
}
Response:
json{
  "success": true,
  "data": {
    "document_id": "uuid",
    "extracted_data": {
      "name": "John Doe",
      "date": "2025-06-11",
      "signature": true
    },
    "validation_results": {
      "valid": false,
      "errors": [
        {
          "field": "email",
          "message": "Email field is required",
          "suggestion": "Please provide a valid email address"
        }
      ],
      "warnings": [
        {
          "field": "date",
          "message": "Date format should be YYYY-MM-DD"
        }
      ]
    }
  }
}
Get Templates
httpGET /api/templates
Create Template
httpPOST /api/templates
Content-Type: application/json

{
  "name": "W-4 Tax Form",
  "description": "Employee's Withholding Certificate",
  "schema": {
    "required_fields": [
      "first_name",
      "last_name",
      "ssn",
      "address"
    ],
    "field_types": {
      "ssn": "ssn",
      "date": "date",
      "email": "email"
    }
  }
}
Complete API Reference
For complete API documentation, visit: http://localhost:5000/api/docs when running the application.
🧪 Testing
Running Tests
bash# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# AI service tests
cd ai-service
pytest

# Integration tests
npm run test:integration
Test Coverage
bash# Generate coverage report
npm run test:coverage

# View coverage report
open coverage/lcov-report/index.html
📦 Deployment
Production Build
bash# Build frontend for production
cd frontend
npm run build

# Build backend
cd backend
npm run build

# Build Docker images
docker-compose -f docker-compose.prod.yml build
Deployment Options
1. Docker Deployment
bash# Production deployment with Docker
docker-compose -f docker-compose.prod.yml up -d
2. Cloud Deployment
AWS:

Frontend: Deploy to S3 + CloudFront
Backend: Deploy to ECS or Lambda
Database: RDS PostgreSQL
AI Service: EC2 with GPU support

Vercel + Railway:

Frontend: Deploy to Vercel
Backend: Deploy to Railway
Database: Railway PostgreSQL

Google Cloud:

Frontend: Firebase Hosting
Backend: Cloud Run
Database: Cloud SQL
AI Service: Compute Engine

Environment-Specific Configurations
Create separate configuration files for different environments:

docker-compose.dev.yml - Development
docker-compose.staging.yml - Staging
docker-compose.prod.yml - Production

🔧 Customization
Adding New Templates

Create template JSON in backend/templates/
Run the seeder: npm run seed:templates
Or use the API endpoint to create templates dynamically

Custom Validation Rules
javascript// backend/src/validators/custom.js
const customValidators = {
  ssn: (value) => {
    const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
    return ssnRegex.test(value);
  },
  
  businessEmail: (value) => {
    return value.includes('@') && !value.includes('@gmail.com');
  }
};
Adding New AI Models
python# ai-service/app/models/custom_model.py
from transformers import AutoModel, AutoTokenizer

class CustomDocumentProcessor:
    def __init__(self, model_name):
        self.model = AutoModel.from_pretrained(model_name)
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
    
    def extract_data(self, document_path):
        # Your custom extraction logic
        pass
🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository
Create a feature branch: git checkout -b feature/amazing-feature
Commit your changes: git commit -m 'Add amazing feature'
Push to the branch: git push origin feature/amazing-feature
Open a Pull Request


Code Style

Backend: ESLint + Prettier configuration
Frontend: ESLint + Prettier with React rules
Python: Black formatter + flake8 linter

🐛 Troubleshooting
Common Issues
1. File Upload Fails
bash# Check file size limits
echo $MAX_FILE_SIZE

# Check upload directory permissions
ls -la uploads/

# Verify supported file types
curl -X POST -F "file=@test.pdf" http://localhost:5000/api/documents/validate
2. AI Service Connection Error
bash# Check if AI service is running
curl http://localhost:8000/health

# Check logs
docker logs compliance-ai-service

# Restart AI service
docker-compose restart ai-service
3. Database Connection Issues
bash# Check PostgreSQL status
pg_isready -h localhost -p 5432

# Test connection
psql -h localhost -p 5432 -U username -d compliance_db

# Run migrations
npx prisma migrate deploy
4. Performance Issues

Large Files: Implement file chunking for files > 10MB
Memory Usage: Increase Node.js heap size: --max-old-space-size=4096
AI Processing: Use GPU acceleration for faster model inference

Debug Mode
Enable debug logging by setting environment variables:
bashDEBUG=compliance:* npm run dev
LOG_LEVEL=debug python app/main.py
📈 Performance Optimization
Backend Optimization

Caching: Redis for frequently accessed templates
Database: Connection pooling and query optimization
File Processing: Background job queue for large files

Frontend Optimization

Code Splitting: Lazy loading for better initial load times
Image Optimization: WebP format for document previews
CDN: Serve static assets from CDN

AI Service Optimization

Model Caching: Keep models in memory between requests
Batch Processing: Process multiple documents simultaneously
GPU Acceleration: Use CUDA for faster inference

📊 Monitoring
Health Checks
bash# Backend health
curl http://localhost:5000/health

# AI service health
curl http://localhost:8000/health






Made with ❤️ by the Compliance Form Validator Team
Star ⭐ this repository if you find it helpful!
