// components
import AppHeader from "@/components/AppHeader";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import TechSection from "@/components/TechSection";
import ContactSection from "@/components/ContactSection";

// home page ( / route ) component
export default function Home() {
  return (
    <>
      <div className={`
        max-w-11/12
        w-full
        m-auto
      `}>
        <AppHeader />
        <HeroSection />
        <ProjectsSection />
        <TechSection />
      </div>

      {/* out of centered container */}
      <ContactSection />
    </>
  );
}
