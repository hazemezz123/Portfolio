"use client";

import { m } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "SpeedYou Scooter Rental",
    description:
      "A modern web application for scooter rentals with booking system and responsive design. Built with React.js and styled with Tailwind CSS for a clean, user-friendly interface.",
    tags: ["React.js", "JavaScript", "Tailwind CSS", "Responsive Design"],
    demoUrl: "https://speedyou.vercel.app/",
    codeUrl: "https://github.com/hazemezz123/Economic-Project",
    image: "/projects/speedyou.webp",
  },
  {
    id: 2,
    title: "Dern Support Company",
    description:
      "A professional company website for a support service with modern UI/UX design. Developed with Next.js for optimal performance and SEO benefits.",
    tags: ["Next.js", "React", "CSS", "Responsive Design"],
    demoUrl: "https://dern-company.vercel.app/",
    codeUrl: "https://github.com/hazemezz123/dern-Company",
    image: "/projects/dern.webp",
  },
  {
    id: 3,
    title: "API College Tournament Platform",
    description:
      "A comprehensive API system for managing student tournaments, featuring team registration, scheduling, and results tracking with PHP backend.",
    tags: ["PHP", "MySQL", "REST API", "Backend Development"],
    codeUrl: "https://github.com/hazemezz123/API-College-Tournament-Platform",
    image: "/projects/tournament.webp",
  },
  {
    id: 4,
    title: "H4ck3r File Organizer",
    description:
      "A Python desktop application with a matrix-inspired UI that efficiently organizes files by type. Features smart file categorization and customizable organization options.",
    tags: ["Python", "Desktop App", "File Management", "GUI"],
    codeUrl: "https://github.com/hazemezz123/H4ck3r_File_Organizer",
    image: "/projects/h4ck3r.webp",
  },
  {
    id: 5,
    title: "Superhero Battle Simulator",
    description:
      "An interactive Python GUI application that simulates battles between superheroes and villains with real-time health bars, battle logs, and persistent data storage.",
    tags: ["Python", "OOP", "Tkinter", "GUI", "Data Persistence"],
    codeUrl: "https://github.com/hazemezz123/Python-oppSkills",
    image: "/projects/superhero.webp",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="retro-header inline-block text-3xl font-bold mb-4 px-6 py-2">
            <span className="text-retro-purple">MY</span>{" "}
            <span className="text-retro-gray">PROJECTS</span>
          </h2>
          <div className="w-24 h-1 bg-retro-green mx-auto"></div>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <m.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="retro-container p-0 overflow-hidden group"
            >
              <div className="bg-retro-beige p-1">
                <div className="bg-retro-gray p-2 flex items-center">
                  <div className="h-3 w-3 rounded-full bg-retro-purple mr-2"></div>
                  <div className="h-3 w-3 rounded-full bg-retro-blue mr-2"></div>
                  <div className="h-3 w-3 rounded-full bg-retro-green mr-auto"></div>
                  <div className="font-bold text-retro-beige text-sm font-mono">
                    {project.title}.exe
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-retro-purple mb-2 group-hover:text-retro-blue transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-retro-gray mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-retro-gray text-retro-beige text-xs px-3 py-1 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="retro-button font-bold text-sm text-white px-4 py-2 hover:bg-retro-green transition-colors"
                      >
                        LIVE DEMO
                      </a>
                    )}
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="retro-button font-bold text-sm text-white px-4 py-2 hover:bg-retro-blue transition-colors"
                    >
                      <span className="mr-1">&lt;/&gt;</span> CODE
                    </a>
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-block retro-container p-4 bg-retro-beige">
            <p className="text-retro-gray font-mono mb-2">
              $ more projects loading...
            </p>
            <div className="h-2 bg-retro-gray overflow-hidden">
              <m.div
                className="h-full bg-retro-green"
                initial={{ width: "0%" }}
                animate={{ width: "70%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              ></m.div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
