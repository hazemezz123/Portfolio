"use client";

import { m } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="retro-container py-8">
      <div className="container mx-auto px-4">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <div className="w-full max-w-lg mx-auto border-t-4 border-b-4 border-retro-gray py-4 my-4">
            <div className="text-retro-purple font-bold text-2xl mb-2 font-mono">
              RETRO DEV
            </div>
            <p className="text-retro-gray">
              Creating web experiences with nostalgic vibes
            </p>
          </div>

          <p className="text-retro-gray text-sm mt-6 font-mono">
            &copy; {currentYear} · MADE WITH HTML, CSS, AND JAVASCRIPT
          </p>
        </m.div>
      </div>
    </footer>
  );
}
