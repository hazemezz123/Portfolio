import Navbar from "./components/ui/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Contact from "./components/sections/Contact";
import Guestbook from "./components/sections/Guestbook";
import Footer from "./components/ui/Footer";

export default function Home() {
  return (
    <main>
      <div className="scanline"></div>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Guestbook />
      <Contact />
      <Footer />
    </main>
  );
}
