import { NextResponse } from "next/server";

export async function GET() {
  // Basic API response for testing
  const deployment = process.env.VERCEL_ENV || "development";
  const url = process.env.VERCEL_URL || "localhost:3000";

  return NextResponse.json({
    message: "Hello from the API!",
    environment: deployment,
    deployment_url: url,
    timestamp: new Date().toISOString(),
  });
}

// Add OPTIONS method for CORS handling
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
