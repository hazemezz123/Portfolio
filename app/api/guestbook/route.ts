import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../lib/mongoose";
import GuestbookEntry from "./models/GuestbookEntry";

// Helper function with timeout
const withTimeout = <T>(promise: Promise<T>, timeoutMs = 5000): Promise<T> => {
  let timeoutId: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error("Operation timed out"));
    }, timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutId);
  });
};

// Define Error interface to avoid using 'any'
interface CustomError extends Error {
  message: string;
  name: string;
}

// GET /api/guestbook - Get all guestbook entries
export async function GET() {
  try {
    // Try to connect with a timeout
    await withTimeout(dbConnect(), 3000);

    // If we get here, connection was successful
    const entries = await withTimeout(
      GuestbookEntry.find({}).sort({ createdAt: -1 }).limit(20),
      3000
    );

    return NextResponse.json({ entries }, { status: 200 });
  } catch (error: unknown) {
    console.error("Failed to fetch guestbook entries:", error);

    // Cast error to CustomError type
    const err = error as CustomError;

    // Return a more specific error message based on the error
    const errorMessage =
      err.message === "Operation timed out"
        ? "Database connection timed out. Please try again later."
        : "Failed to fetch guestbook entries";

    // Return empty entries with a success status but with an error message
    // This allows the UI to still render without completely failing
    return NextResponse.json(
      {
        entries: [],
        error: errorMessage,
        connectionIssue: true,
      },
      { status: 200 }
    );
  }
}

// POST /api/guestbook - Add a new guestbook entry
export async function POST(request: NextRequest) {
  try {
    // Try to connect with a timeout
    await withTimeout(dbConnect(), 3000);

    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    // Create new entry with timeout
    const newEntry = await withTimeout(
      GuestbookEntry.create({
        name: body.name,
        email: body.email,
        message: body.message,
        location: body.location || "",
        date: new Date(),
      }),
      5000
    );

    return NextResponse.json(
      { message: "Guestbook entry added successfully", entry: newEntry },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Failed to add guestbook entry:", error);

    // Cast error to CustomError type
    const err = error as CustomError;

    // Return a more specific error message based on the error
    const errorMessage =
      err.message === "Operation timed out"
        ? "Database operation timed out. Please try again later."
        : "Failed to add guestbook entry";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
