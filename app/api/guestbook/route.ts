import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../lib/mongoose";
import GuestbookEntry from "./models/GuestbookEntry";

// GET /api/guestbook - Get all guestbook entries
export async function GET() {
  try {
    // Try to connect to MongoDB
    await dbConnect();

    // If we reached here, connection was successful
    const entries = await GuestbookEntry.find({})
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(20); // Limit to 20 entries

    return NextResponse.json({ entries }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch guestbook entries:", error);

    // Determine if it's a connection error
    const errorMessage = error instanceof Error ? error.message : String(error);
    const isConnectionError = errorMessage.includes("connect to MongoDB");

    return NextResponse.json(
      {
        error: isConnectionError
          ? "Database connection error. Please check your MongoDB configuration."
          : "Failed to fetch guestbook entries",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

// POST /api/guestbook - Add a new guestbook entry
export async function POST(request: NextRequest) {
  try {
    // Try to connect to MongoDB
    await dbConnect();

    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    // Create new entry
    const newEntry = await GuestbookEntry.create({
      name: body.name,
      email: body.email,
      message: body.message,
      location: body.location || "",
      date: new Date(),
    });

    return NextResponse.json(
      { message: "Guestbook entry added successfully", entry: newEntry },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to add guestbook entry:", error);

    // Determine if it's a connection error
    const errorMessage = error instanceof Error ? error.message : String(error);
    const isConnectionError = errorMessage.includes("connect to MongoDB");

    return NextResponse.json(
      {
        error: isConnectionError
          ? "Database connection error. Please check your MongoDB configuration."
          : "Failed to add guestbook entry",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

// Add OPTIONS handler for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
