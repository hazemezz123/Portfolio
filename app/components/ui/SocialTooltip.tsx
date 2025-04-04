"use client";

import { ReactNode, useState } from "react";
import { m, AnimatePresence } from "framer-motion";

interface SocialTooltipProps {
  children: ReactNode;
  label: string;
}

export default function SocialTooltip({ children, label }: SocialTooltipProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 bottom-full -translate-x-1/2 mb-2 z-10"
          >
            <div className="retro-container bg-retro-purple px-2 py-1 text-xs whitespace-nowrap">
              <span className="font-mono ">{label}</span>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
