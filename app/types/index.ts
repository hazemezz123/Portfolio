import type { Mongoose } from "mongoose";

declare global {
  // Add custom global interfaces to the global namespace
  // This helps with TypeScript errors related to global properties
  // eslint-disable-next-line no-var
  var mongoose:
    | {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      }
    | undefined;
}
