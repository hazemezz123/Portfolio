import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client with environment variables
// You'll need to add these to your Vercel environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Type definition for guestbook entries
export interface GuestbookEntry {
  id: number;
  created_at: string;
  name: string;
  email: string;
  message: string;
  location?: string;
}
