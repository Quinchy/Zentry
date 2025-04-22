import { Button } from "@/components/ui/button";
import { Badge } from "@/components/custom/badge";
import { ListChecks, Clock3, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/public/images/hero-image.png"
import GridStars from "@/public/images/grid-stars.png"
import Dashboard from "@/public/images/zentry-dashboard.png"

export default function Hero() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden">
        <div className="flex items-center justify-center gap-16 py-32">
          <div className="flex flex-col items-start gap-8 max-w-[42rem]">
            <div className="flex flex-wrap items-start justify-start gap-5 mt-6">
              <Badge
                icon={<ListChecks className="w-4 h-4" />}
                label="Smart Team Sync"
              />
              <Badge
                icon={<Clock3 className="w-4 h-4" />}
                label="Automated Time Logs"
              />
              <Badge
                icon={<Users className="w-4 h-4" />}
                label="Smart Team Sync"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="font-extrabold text-balance text-6xl text-start">
                Streamline Success,
                <br />
                <span className="text-primary">Sync Your Workforce</span>
              </h1>
              <p className="text-foreground/85">
                Zentry is an all-in-one platform that brings employee
                management, team chat, and scheduling together—everything your
                company needs in one seamless solution.
              </p>
            </div>
            <div className="flex gap-2 z-50">
              <Button asChild size={"xl"}>
                <Link href="/">Get started!</Link>
              </Button>
              <Button asChild variant={"outline"} size={"xl"}>
                <Link href="/">Learn more</Link>
              </Button>
            </div>
          </div>
          <Image
            src={HeroImage}
            alt="Hero Image"
            height={500}
            className="z-50"
            draggable="false"
          />
        </div>
        <Image
          src={GridStars}
          alt="Grid Stars Background"
          className="absolute left-1/2 top-[33rem] -translate-x-1/2 -z-0"
          draggable="false"
        />
      </div>
      <div className="bg-dark-primary w-full flex justify-center z-50">
        <Image
          src={Dashboard}
          alt="Zentry Web App Dashboard"
          width={1100}
          quality={100}
          className="border-8 rounded-3xl -translate-y-10"
          draggable="false"
        />
      </div>
    </div>
  );
}
