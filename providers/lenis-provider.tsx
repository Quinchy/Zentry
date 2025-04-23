// lenis-provider.tsx
"use client";
import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";

type LenisScrollProviderProps = {
  children: ReactNode;
};

const LenisScrollProvider = ({ children }: LenisScrollProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with your options
    lenisRef.current = new Lenis({
      duration: 1.5,
      lerp: 0.1,
      smoothWheel: true,
    });

    const animate = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return () => {
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
};

export default LenisScrollProvider;
