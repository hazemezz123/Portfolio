"use client";

import { m } from "framer-motion";
import { useState, useEffect } from "react";

const experiences = [
  {
    year: "2023 - Present",
    title: "Frontend Developer",
    company: "TechCorp Inc.",
    description:
      "Led development of multiple web applications using React and Next.js. Implemented modern UI/UX designs while maintaining retro-inspired themes.",
  },
  {
    year: "2021 - 2023",
    title: "Learing ",
    company: "Digital Solutions Ltd.",
    description:
      "Worked on e-commerce projects with focus on responsive design and cross-browser compatibility. Integrated payment gateways and optimized site performance.",
  },
  {
    year: "2019 - 2021",
    title: "Junior Developer",
    company: "Creative Studio",
    description:
      "Created and maintained websites for small businesses. Designed and implemented UI components using JavaScript and CSS frameworks.",
  },
  {
    year: "2018 - 2019",
    title: "Freelance Developer",
    company: "Self-employed",
    description:
      "Designed and developed custom websites for clients. Specialized in WordPress themes and plugins customization.",
  },
];

export default function Experience() {
  const [scrollY, setScrollY] = useState(0);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="retro-header inline-block text-3xl font-bold mb-4 px-6 py-2">
            <span className="text-white">EXPERIENCE</span>
          </h2>
          <div className="w-24 h-1 bg-retro-green mx-auto"></div>
        </m.div>

        <div className="relative overflow-hidden">
          <div className="scanline" style={{ opacity: 0.3 }}></div>
          <div
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-retro-gray"
            style={{
              transform: "translateX(-50%)",
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 10px, var(--retro-blue) 10px, var(--retro-blue) 20px)",
            }}
          ></div>

          <div className="relative z-10">
            {experiences.map((exp, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`mb-16 relative ${
                  index % 2 === 0
                    ? "text-right mr-auto ml-0"
                    : "text-left ml-auto mr-0"
                }`}
                style={{
                  width: "calc(50% - 20px)",
                  marginTop: index === 0 ? "0" : "-20px",
                  transform: `translateY(${
                    scrollY * 0.02 * (index % 2 === 0 ? -1 : 1)
                  }px)`,
                }}
                onMouseEnter={() => setActiveItem(index)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <div
                  className={`retro-container relative ${
                    activeItem === index
                      ? "bg-retro-beige border-retro-blue"
                      : ""
                  }`}
                >
                  <div
                    className={`absolute top-1/2 ${
                      index % 2 === 0 ? "left-full" : "right-full"
                    } w-5 h-1 bg-retro-gray`}
                    style={{ transform: "translateY(-50%)" }}
                  ></div>

                  <div
                    className={`absolute ${
                      index % 2 === 0 ? "left-full ml-4" : "right-full mr-4"
                    } top-1/2 transform -translate-y-1/2 w-3 h-3 retro-container p-0 border-2 ${
                      activeItem === index
                        ? "border-retro-blue bg-retro-yellow"
                        : "border-retro-gray bg-retro-beige"
                    }`}
                  ></div>

                  <div className="font-mono text-xs text-retro-blue mb-1">
                    {exp.year}
                  </div>
                  <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                  <div className="text-retro-purple font-bold mb-2">
                    {exp.company}
                  </div>
                  <p className="text-sm">{exp.description}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="retro-container inline-block mx-auto">
            <div className="font-mono">
              <div className="mb-2">
                &gt; <span className="text-retro-blue">resume.exe</span>
              </div>
              <div className="text-retro-green blink">
                Download my full resume
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
