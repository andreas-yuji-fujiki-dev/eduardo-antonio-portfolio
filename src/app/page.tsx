// components
import AppHeader from "@/components/AppHeader";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";

// home page ( / route ) component
export default function Home() {
  return (
    <main>
      <AppHeader />
      <HeroSection />
      <ProjectsSection />
    </main>
  );
};