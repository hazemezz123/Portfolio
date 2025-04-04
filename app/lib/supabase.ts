import { createClient } from "@supabase/supabase-js";

// Simple dummy client for server-side rendering
const createDummyClient = () => {
  return {
    from: () => ({
      select: () => ({
        order: () => ({
          limit: () => Promise.resolve({ data: [], error: null }),
        }),
      }),
      insert: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
      }),
    }),
  };
};

// Create appropriate client based on environment
let supabase;

// Only initialize a real client on the browser
if (typeof window !== "undefined") {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase credentials missing");
    supabase = createDummyClient();
  } else {
    supabase = createClient(supabaseUrl, supabaseKey);
  }
} else {
  // Use dummy client during build/SSR
  supabase = createDummyClient();
}

export { supabase };

// Type definition for guestbook entries
export interface GuestbookEntry {
  id: number;
  created_at: string;
  name: string;
  email: string;
  message: string;
  location?: string;
}
