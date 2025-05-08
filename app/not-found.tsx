import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/logo.svg";
import { Button } from "@/components/shadcn/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <div className="flex items-center gap-2">
        <Image
          src={Logo}
          alt="Logo"
          width={40}
          priority
        />
        <h1 className="font-black text-3xl text-primary">
          Zentry
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-primary">404 Not Found</h1>
        <p className="text-sm text-muted-foreground">
          {"Oops! The page you're looking for doesn't exist."}
        </p>
      </div>
      <Button asChild variant={"outline"} size={"xl"}>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
