import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Footer } from "@/components/site/Footer";
import { WhatsappButton } from "@/components/site/WhatsappButton";
import { ScrollToTopButton } from "@/components/site/ScrollToTopButton";
import { TooltipProvider } from "@/components/ui/tooltip";
import dynamic from "next/dynamic";

const Services = dynamic(() => import("@/components/site/Services").then((mod) => mod.Services), {
  loading: () => <div className="min-h-[500px] animate-pulse bg-muted/10" />,
});

const About = dynamic(() => import("@/components/site/About").then((mod) => mod.About), {
  loading: () => <div className="min-h-[500px] animate-pulse bg-muted/10" />,
});

const Testimonials = dynamic(() => import("@/components/site/Testimonials").then((mod) => mod.Testimonials), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-muted/10" />,
});

const Contact = dynamic(() => import("@/components/site/Contact").then((mod) => mod.Contact), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-muted/10" />,
});

const Gallery = dynamic(() => import("@/components/site/Gallery").then((mod) => mod.Gallery), {
  loading: () => <div className="min-h-[500px] animate-pulse bg-muted/10" />,
});

export default function Home() {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <Services />
          <About />
          <Testimonials />
          <Contact />
          <Gallery />
        </main>
        <Footer />
        <WhatsappButton />
        <ScrollToTopButton />
      </div>
    </TooltipProvider>
  );
}
