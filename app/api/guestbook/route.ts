import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../lib/mongoose";
import GuestbookEntry from "./models/GuestbookEntry";

// GET /api/guestbook - Get all guestbook entries
export async function GET() {
  try {
    await dbConnect();

    const entries = await GuestbookEntry.find({})
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(20); // Limit to 20 entries

    return NextResponse.json({ entries }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch guestbook entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch guestbook entries" },
      { status: 500 }
    );
  }
}

// POST /api/guestbook - Add a new guestbook entry
export async function POST(request: NextRequest) {
  try {
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
    return NextResponse.json(
      { error: "Failed to add guestbook entry" },
      { status: 500 }
    );
  }
}
