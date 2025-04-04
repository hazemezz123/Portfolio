import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MotionConfig } from "framer-motion";
import MotionWrapper from "./components/ui/MotionConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hazem's Portfolio",
  description:
    "A high-performance gamer-themed developer portfolio showcasing my skills and projects",
  authors: [{ name: "Hazem Ezz" }],
  keywords: [
    "developer",
    "portfolio",
    "gaming",
    "web development",
    "React",
    "Next.js",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <MotionWrapper>
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </MotionWrapper>
      </body>
    </html>
  );
}
