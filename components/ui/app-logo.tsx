import { routes } from "@/routes";
import Link from "next/link";
import React from "react";
import Logo from "@/public/images/logo.svg";
import Image from "next/image";

export default function AppLogo({ className }: { className?: string }) {
  return (
    <Link
      href={routes.home}
      className={`flex items-center gap-2 group ${className}`}
    >
      <Image
        src={Logo}
        alt="Logo"
        width={40}
        priority={true}
        className="group-hover:brightness-125 transition-all duration-300 ease-in-out"
      />
      <h1 className="font-black text-3xl text-primary group-hover:brightness-125 transition-all duration-300 ease-in-out text-shadow-sm/25 text-shadow-card">
        Zentry
      </h1>
    </Link>
  );
}
