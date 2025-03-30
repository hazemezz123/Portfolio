import mongoose, { Schema } from "mongoose";

// Define the Guestbook entry interface
export interface IGuestbookEntry {
  name: string;
  message: string;
  email: string;
  location?: string;
  date: Date;
}

// Define the Guestbook schema
const GuestbookEntrySchema = new Schema<IGuestbookEntry>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [500, "Message cannot be more than 500 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      maxlength: [100, "Location cannot be more than 100 characters"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model already exists to prevent recompilation error during hot reloading
export default mongoose.models.GuestbookEntry ||
  mongoose.model<IGuestbookEntry>("GuestbookEntry", GuestbookEntrySchema);
