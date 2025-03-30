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

REM Build and test locally
echo Running tests and build...
call npm run lint
call npm run build

REM Check if build was successful
if %ERRORLEVEL% equ 0 (
    echo Build successful!
    
    REM Ask if user wants to deploy to production
    set /p PROD="Deploy to production? (y/n): "
    
    if /i "%PROD%"=="y" (
        echo Deploying to production...
        call vercel --prod
    ) else (
        echo Deploying to preview environment...
        call vercel
    )
    
    echo Deployment process completed!
) else (
    echo Build failed. Please fix the errors before deploying.
    exit /b 1
) 