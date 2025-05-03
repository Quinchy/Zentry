import NavBar from "@/components/ui/layout/navbar";
import Footer from "@/components/ui/layout/footer";
import Hero from "@/features/marketing/home/components/hero";
import Section1 from "@/features/marketing/home/components/section-1";
import LenisScrollProvider from "@/providers/lenis-provider";

export default function Home() {
  return (
    <>
      <LenisScrollProvider>
        <NavBar />
        <Hero />
        <Section1 />
        <Footer />
      </LenisScrollProvider>
    </>
  );
}
