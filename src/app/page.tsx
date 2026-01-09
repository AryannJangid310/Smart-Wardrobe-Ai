import Hero from "@/components/Hero";
import ParallaxSection from "@/components/ParallaxSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Features />
      <ParallaxSection />
      <HowItWorks />
      <Pricing />
      <Footer />
    </main>
  );
}
