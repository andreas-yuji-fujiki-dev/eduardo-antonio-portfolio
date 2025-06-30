// components
import AppHeader from "@/components/AppHeader";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";

// home page ( / route ) component
export default function Home() {
  return (
    <main className={`
      max-w-11/12
      m-auto
    `}>
      <AppHeader />
      <HeroSection />
      <ProjectsSection />
    </main>
  );
};