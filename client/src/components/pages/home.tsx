import Hero from "@/components/pages/sections/hero";
import Features from "@/components/pages/sections/features";
import AboutEvent from "@/components/pages/sections/about-event";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <AboutEvent />
    </main>
  );
}