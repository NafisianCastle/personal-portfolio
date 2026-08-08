import PageLayout from "@/components/layout/PageLayout";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";

export default function Home() {
  return (
    <PageLayout>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        {/* Remaining sections will be added in subsequent tasks */}
        <div id="contact" className="h-1" aria-hidden="true" />
      </main>
    </PageLayout>
  );
}
