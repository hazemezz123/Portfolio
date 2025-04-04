"use client";

import { m, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [clickEffect, setClickEffect] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [tooltipMessage, setTooltipMessage] = useState("PLAYER 1 READY!");

  // Different messages based on click count
  useEffect(() => {
    const messages = [
      "PLAYER 1 READY!",
      "HELLO THERE!",
      "BONUS POINTS!",
      "LEVEL UP!",
      "ACHIEVEMENT UNLOCKED!",
      "RETRO MODE ACTIVATED!",
      "SAVE POINT REACHED!",
      "SECRET CODE FOUND!",
      "EXTRA LIFE!",
      "YOU WIN!",
    ];

    if (clickCount > 0) {
      const messageIndex = (clickCount - 1) % messages.length;
      setTooltipMessage(messages[messageIndex]);
    }
  }, [clickCount]);

  const handleImageClick = () => {
    setClickEffect(true);
    setClickCount((prevCount) => prevCount + 1);

    setTimeout(() => {
      setClickEffect(false);
    }, 300);
  };

  return (
    <section
      id="home"
      className="relative pt-36 pb-20 md:pt-40 md:pb-32 overflow-hidden min-h-screen flex items-center dotted-bg"
    >
      <div className="scanline"></div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="retro-container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="retro-header inline-block mb-2 px-4 py-2"
              >
                <h2 className="text-lg font-bold text-white">
                  Hello, World! I&apos;m
                </h2>
              </m.div>

              <m.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                <span className="text-retro-purple">Hazem</span>
                <span className="text-retro-gray"> Ezz</span>
              </m.h1>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl md:text-2xl font-bold mb-6 h-12"
              >
                <TypeAnimation
                  sequence={[
                    "Full Stack Developer",
                    2000,
                    "Web Designer",
                    2000,
                    "UX/UI Enthusiast",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  className="text-retro-blue"
                  repeat={Infinity}
                />
              </m.div>

              <div className="marquee-container">
                <div className="marquee-content">
                  WELCOME TO MY RETRO-STYLED PORTFOLIO WEBSITE ★ ESTABLISHED
                  2024 ★ BUILT WITH NEXT.JS, TAILWIND AND FRAMER MOTION
                </div>
              </div>

              <m.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-retro-gray text-base mb-8 max-w-lg border-l-4 border-retro-green pl-4"
              >
                Welcome to my digital playground! I craft web experiences that
                blend creativity with functionality. Let&apos;s build something
                amazing together.
              </m.p>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="#contact">
                  <button className="retro-button font-bold text-white px-6 py-3">
                    Get in Touch
                  </button>
                </Link>
                <Link href="#projects">
                  <button className="retro-button font-bold text-white px-6 py-3">
                    View Projects
                  </button>
                </Link>
              </m.div>
            </div>

            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-full md:w-1/2 flex justify-center"
            >
              <div className="retro-container p-2 relative overflow-hidden">
                <m.div
                  className={`pixel-art-container relative cursor-pointer ${
                    clickEffect ? "scale-95" : ""
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setIsImageHovered(true)}
                  onMouseLeave={() => setIsImageHovered(false)}
                  onClick={handleImageClick}
                >
                  <div
                    className={`pixel-frame absolute -inset-1 bg-retro-purple ${
                      clickEffect ? "animate-ping-once" : "animate-pulse-slow"
                    }`}
                  ></div>
                  <Image
                    src="/images/PixelArtImg.png"
                    alt="Hazem Ezz Pixel Art"
                    width={300}
                    height={300}
                    className="relative z-10 image-pixelated"
                    style={{
                      imageRendering: "pixelated",
                      objectFit: "contain",
                    }}
                  />
                  <div className="retro-glitch-effect"></div>

                  {/* Score Counter */}
                  {clickCount > 0 && (
                    <div className="absolute top-2 right-2 z-40">
                      <div className="retro-container bg-retro-gray px-2 py-1">
                        <span className="font-mono text-retro-beige text-xs">
                          SCORE: {clickCount * 100}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Pixel Art Tooltip */}
                  <AnimatePresence>
                    {(isImageHovered || clickEffect) && (
                      <m.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-40"
                      >
                        <div className="retro-container bg-retro-purple px-3 py-2 text-sm whitespace-nowrap">
                          <span className="font-mono text-white">
                            {tooltipMessage}
                          </span>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              </div>
            </m.div>
          </div>
        </div>
      </div>

      <div className="absolute right-10 bottom-10 hidden sm:block">
        <div className="retro-container px-2 py-1">
          <span className="text-retro-blue font-mono text-sm blink">▮</span>
        </div>
      </div>
    </section>
  );
}
