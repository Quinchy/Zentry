"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/shadcn/ui/button";
import Logo from "@/public/images/logo.svg";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 650);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`inset-x-0 top-0 z-50 ${
        isSticky
          ? "fixed bg-background shadow-md animate-move-down"
          : "absolute"
      }`}
    >
      <div className="flex justify-between items-center w-full container max-w-[90%] md:max-w-[75%] xl:max-w-[65%] mx-auto py-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src={Logo} alt="Logo" width={40} priority />
          <h1 className="font-black text-3xl">Zentry</h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Button asChild size="xl">
            <Link href="/login">Login</Link>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden focus:outline-none"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Fullscreen Mobile Menu */}
      {open && (
        <div className="fixed inset-0 bg-background bg-opacity-95 backdrop-blur-sm flex flex-col items-center justify-center space-y-8 lg:hidden">
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 focus:outline-none"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>

          <Link
            href="/"
            className="text-2xl font-medium"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-2xl font-medium"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-2xl font-medium"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          <Button asChild size="xl">
            <Link href="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
