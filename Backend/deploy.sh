#!/bin/bash

# SheSync Backend Deployment Script for Render
echo "🚀 SheSync Backend Deployment Script"
echo "====================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the Backend directory."
    exit 1
fi

# Check if all required files exist
echo "📋 Checking required files..."
required_files=("index.js" "config/db.js" "render.yaml" "Dockerfile.prod")
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file found"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

echo ""
echo "✅ All required files are present!"
echo ""
echo "📝 Next steps for Render deployment:"
echo "1. Push your code to GitHub repository"
echo "2. Go to https://dashboard.render.com"
echo "3. Click 'New +' and select 'Blueprint'"
echo "4. Connect your GitHub repository"
echo "5. Render will detect the render.yaml file"
echo "6. Set your environment variables:"
echo "   - MONGO_URL"
echo "   - APP_NAME"
echo "   - FRONTEND_URL"
echo "   - VITE_SERPAPI_KEY"
echo "   - CLERK_SECRET_KEY"
echo "   - CLERK_PUBLISHABLE_KEY"
echo "7. Click 'Create Blueprint Instance'"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🔗 Your API will be available at: https://your-service-name.onrender.com"
echo "🏥 Health check endpoint: https://your-service-name.onrender.com/health"
