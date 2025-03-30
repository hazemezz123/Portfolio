"use client";

import { m } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

export default function Hero() {
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
              <div className="retro-container w-64 h-64 md:w-80 md:h-80 relative overflow-hidden">
                <div className="absolute inset-4 bg-retro-gray flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="text-retro-beige text-6xl mb-4 font-mono">
                      &lt;/&gt;
                    </div>
                    <div className="text-retro-beige font-bold">RETRO DEV</div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </div>

      <div className="absolute right-10 bottom-10">
        <div className="retro-container px-2 py-1">
          <span className="text-retro-blue font-mono text-sm blink">▮</span>
        </div>
      </div>
    </section>
  );
}
