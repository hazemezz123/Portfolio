@echo off
echo 🚀 Starting deployment process...

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Vercel CLI not found. Installing...
    call npm i -g vercel
)

REM Check if logged in to Vercel
vercel whoami >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Not logged in to Vercel. Please login:
    call vercel login
)

REM Check if .env.local exists
if not exist .env.local (
    echo No .env.local file found. Creating from example...
    copy .env.local.example .env.local
    echo Please fill in your environment variables in .env.local before deploying.
    exit /b 1
)

REM Set environment variables for the build
set NEXT_TELEMETRY_DISABLED=1
set NODE_OPTIONS=--openssl-legacy-provider

REM Build and test locally
echo Running tests and build...
call npm run lint
call npm run build

REM Check if build was successful
if %ERRORLEVEL% equ 0 (
    echo Build successful!
    
    REM Prompt for environment variables if needed
    echo.
    echo Checking environment variables...
    set /p CHECK_ENV="Do you need to set environment variables for Vercel? (y/n): "
    
    if /i "%CHECK_ENV%"=="y" (
        echo.
        echo Enter your MongoDB URI:
        set /p MONGODB_URI=
        
        echo Enter your EmailJS Service ID:
        set /p EMAILJS_SERVICE_ID=
        
        echo Enter your EmailJS Template ID:
        set /p EMAILJS_TEMPLATE_ID=
        
        echo Enter your EmailJS Public Key:
        set /p EMAILJS_PUBLIC_KEY=
        
        echo.
        echo These variables will be set during deployment.
    )
    
    REM Ask if user wants to deploy to production
    echo.
    set /p PROD="Deploy to production? (y/n): "
    
    if /i "%PROD%"=="y" (
        echo Deploying to production...
        if /i "%CHECK_ENV%"=="y" (
            call vercel --prod -e NEXT_TELEMETRY_DISABLED=1 -e MONGODB_URI="%MONGODB_URI%" -e NEXT_PUBLIC_EMAILJS_SERVICE_ID="%EMAILJS_SERVICE_ID%" -e NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="%EMAILJS_TEMPLATE_ID%" -e NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="%EMAILJS_PUBLIC_KEY%"
        ) else (
            call vercel --prod -e NEXT_TELEMETRY_DISABLED=1
        )
    ) else (
        echo Deploying to preview environment...
        if /i "%CHECK_ENV%"=="y" (
            call vercel -e NEXT_TELEMETRY_DISABLED=1 -e MONGODB_URI="%MONGODB_URI%" -e NEXT_PUBLIC_EMAILJS_SERVICE_ID="%EMAILJS_SERVICE_ID%" -e NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="%EMAILJS_TEMPLATE_ID%" -e NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="%EMAILJS_PUBLIC_KEY%"
        ) else (
            call vercel -e NEXT_TELEMETRY_DISABLED=1
        )
    )
    
    echo Deployment process completed!
) else (
    echo Build failed. Please fix the errors before deploying.
    exit /b 1
) 