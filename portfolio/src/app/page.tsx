import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import FeaturedProjects from "@/components/FeaturedProjects";
import CareerSummary from "@/components/CareerSummary";
import Others from "@/components/Others";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Skills />
        <FeaturedProjects />
        <CareerSummary />
        <Others />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
