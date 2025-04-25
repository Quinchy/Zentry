"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/custom/badge";
import { ListChecks, Clock3, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/public/images/hero-image.png";
import GridStars from "@/public/images/grid-stars.png";
import Dashboard from "@/public/images/zentry-dashboard.png";
import { motion, useScroll, useTransform } from "motion/react";

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const translateY = useTransform(scrollYProgress, [0, 1], [50, -300]);

  return (
    <>
      <div className="relative overflow-hidden">
        <motion.div className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-20 py-28 lg:py-32 max-w-[90%] md:max-w-[75%] lg:max-w-[75%] xl:max-w-[65%] container justify-self-center">
          <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-8">
            <div className="flex flex-wrap items-start justify-center lg:justify-start gap-2 xl:gap-4">
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
              <h1 className="font-extrabold text-balance text-5xl lg:text-6xl text-center lg:text-start">
                Streamline Success,
                <br />
                <span className="text-primary">Sync Your Workforce</span>
              </h1>
              <p className="text-foreground/85 text-center lg:text-start">
                Zentry is an all-in-one platform that brings employee
                management, team chat, and scheduling together—everything your
                company needs in one seamless solution.
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 z-50">
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
            width={HeroImage.width}
            height={HeroImage.height}
            className="z-10 max-w-[350px] md:max-w-[400px]"
            priority
          />
        </motion.div>
        <Image
          src={GridStars}
          alt="Grid Stars Background"
          width={GridStars.width}
          height={GridStars.height}
          className="absolute left-1/2 w-full top-[80%] lg:top-[80%] xl:top-[70%] -translate-x-1/2 -z-0"
          draggable="false"
        />
      </div>
      <div className="bg-dark-primary w-full flex justify-center z-10">
        <motion.div
          style={{ y: translateY }}
          className="p-2 bg-primary/50 rounded-2xl max-w-[350px] md:max-w-[500px] lg:max-w-[800px] xl:max-w-[65%]"
        >
          <Image
            src={Dashboard}
            alt="Zentry Web App Dashboard"
            width={Dashboard.width}
            height={Dashboard.height}
            className="rounded-xl shadow-primary/50 shadow-2xl"
            priority
          />
        </motion.div>
      </div>
    </>
  );
}
