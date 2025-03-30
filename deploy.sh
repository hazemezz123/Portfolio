#!/bin/bash

# Portfolio Deployment Script for Vercel

echo "🚀 Starting deployment process..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "⚠️ Vercel CLI not found. Installing..."
    npm i -g vercel
fi

# Check if logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "⚠️ Not logged in to Vercel. Please login:"
    vercel login
fi

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️ No .env.local file found. Creating from example..."
    cp .env.local.example .env.local
    echo "Please fill in your environment variables in .env.local before deploying."
    exit 1
fi

# Build and test locally
echo "🔍 Running tests and build..."
npm run lint
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Ask if user wants to deploy to production
    read -p "Deploy to production? (y/n): " PROD
    
    if [ "$PROD" = "y" ]; then
        echo "🚀 Deploying to production..."
        vercel --prod
    else
        echo "🧪 Deploying to preview environment..."
        vercel
    fi
    
    echo "✨ Deployment process completed!"
else
    echo "❌ Build failed. Please fix the errors before deploying."
    exit 1
fi 