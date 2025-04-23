import NavBar from "@/components/layout/navbar";
import Hero from "./components/hero"
import Section1 from "./components/section-1";
import Footer from "@/components/layout/footer";
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
