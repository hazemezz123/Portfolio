import { createClient } from "@supabase/supabase-js";

// Type definition for guestbook entries
export interface GuestbookEntry {
  id: number;
  created_at: string;
  name: string;
  email: string;
  message: string;
  location?: string;
}

// Create a dummy client for SSR/build
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

// Create a safe singleton pattern for the Supabase client
let _supabase: any = null;

export const supabase = (() => {
  // Return cached instance if it exists
  if (_supabase !== null) return _supabase;

  try {
    // Only create a real client in browser environment
    if (typeof window !== "undefined") {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey) {
        _supabase = createClient(supabaseUrl, supabaseKey);
        return _supabase;
      }

      console.error("Supabase credentials missing");
    }

    // Use dummy client for SSR or missing credentials
    _supabase = createDummyClient();
    return _supabase;
  } catch (e) {
    console.error("Error initializing Supabase client:", e);
    _supabase = createDummyClient();
    return _supabase;
  }
})();
