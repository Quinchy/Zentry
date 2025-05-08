// components/AuthLayout.tsx
import Image from "next/image";
import Test from "@/public/images/auth-background.webp";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid grid-cols-5 h-screen">
      {children}
      <div className="col-span-3 overflow-hidden">
        <Image
          src={Test}
          alt="Auth Background Image"
          width={Test.width}
          height={Test.height}
          className="h-full w-full object-cover"
          quality={10}
          placeholder="blur"
          priority={true}
        />
      </div>
    </div>
  );
}
