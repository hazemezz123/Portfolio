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
    
    # Prompt for environment variables if needed
    echo ""
    echo "Checking environment variables..."
    read -p "Do you need to set environment variables for Vercel? (y/n): " CHECK_ENV
    
    if [ "$CHECK_ENV" = "y" ]; then
        echo ""
        echo "Enter your MongoDB URI:"
        read MONGODB_URI
        
        echo "Enter your EmailJS Service ID:"
        read EMAILJS_SERVICE_ID
        
        echo "Enter your EmailJS Template ID:"
        read EMAILJS_TEMPLATE_ID
        
        echo "Enter your EmailJS Public Key:"
        read EMAILJS_PUBLIC_KEY
        
        echo ""
        echo "These variables will be set during deployment."
    fi
    
    # Ask if user wants to deploy to production
    echo ""
    read -p "Deploy to production? (y/n): " PROD
    
    if [ "$PROD" = "y" ]; then
        echo "🚀 Deploying to production..."
        if [ "$CHECK_ENV" = "y" ]; then
            vercel --prod \
            -e MONGODB_URI="$MONGODB_URI" \
            -e NEXT_PUBLIC_EMAILJS_SERVICE_ID="$EMAILJS_SERVICE_ID" \
            -e NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="$EMAILJS_TEMPLATE_ID" \
            -e NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="$EMAILJS_PUBLIC_KEY"
        else
            vercel --prod
        fi
    else
        echo "🧪 Deploying to preview environment..."
        if [ "$CHECK_ENV" = "y" ]; then
            vercel \
            -e MONGODB_URI="$MONGODB_URI" \
            -e NEXT_PUBLIC_EMAILJS_SERVICE_ID="$EMAILJS_SERVICE_ID" \
            -e NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="$EMAILJS_TEMPLATE_ID" \
            -e NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="$EMAILJS_PUBLIC_KEY"
        else
            vercel
        fi
    fi
    
    echo "✨ Deployment process completed!"
else
    echo "❌ Build failed. Please fix the errors before deploying."
    exit 1
fi 