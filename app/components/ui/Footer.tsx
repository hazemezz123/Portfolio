"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SocialTooltip from "./SocialTooltip";

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

          {/* Social Media Icons */}
          <m.div
            className="flex space-x-4 my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
          >
            <m.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="retro-container p-1 cursor-pointer"
            >
              <SocialTooltip label="GitHub">
                <Link
                  href="https://github.com/hazemezz123"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Image
                    src="/icons/github-retro.svg"
                    alt="GitHub"
                    width={32}
                    height={32}
                    className="pixelated"
                  />
                </Link>
              </SocialTooltip>
            </m.div>
            <m.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="retro-container p-1 cursor-pointer"
            >
              <SocialTooltip label="LinkedIn">
                <Link
                  href="https://www.linkedin.com/in/hazem-ezz-424498285/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Image
                    src="/icons/linkedin-retro.svg"
                    alt="LinkedIn"
                    width={32}
                    height={32}
                    className="pixelated"
                  />
                </Link>
              </SocialTooltip>
            </m.div>
            <m.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="retro-container p-1 cursor-pointer"
            >
              <SocialTooltip label="Instagram">
                <Link
                  href="https://www.instagram.com/hazem_ezz_1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Image
                    src="/icons/instagram-retro.svg"
                    alt="Instagram"
                    width={32}
                    height={32}
                    className="pixelated"
                  />
                </Link>
              </SocialTooltip>
            </m.div>
            <m.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="retro-container p-1 cursor-pointer"
            >
              <SocialTooltip label="Facebook">
                <Link
                  href="https://www.facebook.com/profile.php?id=61557867570271"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Image
                    src="/icons/facebook-retro.svg"
                    alt="Facebook"
                    width={32}
                    height={32}
                    className="pixelated"
                  />
                </Link>
              </SocialTooltip>
            </m.div>
          </m.div>

          <p className="text-retro-gray text-sm mt-6 font-mono">
            &copy; {currentYear} · MADE WITH Next.js, Tailwind CSS, and
            TypeScript
          </p>
        </m.div>
      </div>
    </footer>
  );
}
