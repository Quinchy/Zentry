// components/AuthLayout.tsx
import Image from "next/image";
import Test from "@/public/images/auth-background.webp";
import { ReactNode } from "react";
import AppLogo from "@/components/ui/app-logo";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid grid-cols-5 h-screen">
      <div className="flex flex-col items-center justify-between h-screen py-5 px-5 col-span-5 xl:col-span-2 gap-5">
        <AppLogo className="self-start" />
        {children}
        <p className="text-xs text-foreground/75 text-center lg:max-w-md">
          By continuing, you agree to {"Zentry's"} <u>Terms of Service</u> and{" "}
          <u>Privacy Policy</u>, and to receive periodic emails with updates.
        </p>
      </div>
      <div className="overflow-hidden hidden xl:block col-span-3 row-span-5">
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
