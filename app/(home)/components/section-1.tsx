import Image, { StaticImageData } from "next/image";
import SectionGraphic1 from "@/public/images/section-graphic-1.png"
import SectionGraphic2 from "@/public/images/section-graphic-2.png"
import SectionGraphic3 from "@/public/images/section-graphic-3.png"
import { Badge } from "@/components/custom/badge";
import { Sparkles } from "lucide-react";

type GraphicCardsProps = {
  image: StaticImageData;
  title: string;
  desc: string;
};

const GraphicCards = ({ image, title, desc }: GraphicCardsProps) => {
  return (
    <div className="flex flex-col items-center bg-dark-primary text-primary-foreground p-10 rounded-2xl group">
      <Image src={image} alt="Graphic Image" height={200} draggable="false" className="group-hover:scale-115 duration-300 ease-in-out transition-all"/>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold text-center">{title}</h1>
        <p className="text-center text-primary-foreground/85">{desc}</p>
      </div>
    </div>
  );
};

export default function Section1() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-36">
      <div className="flex items-end justify-center w-full max-w-[1200px]">
        <div className="flex flex-col items-start gap-2">
          <Badge
            icon={<Sparkles className="w-4 h-4" />}
            label="Application Highlights"
          />
          <h1 className="text-4xl font-bold">
            The perfect platform for team management
          </h1>
        </div>
        <p className="text-foreground/85">
          Zentry is designed for businesses seeking a unified solution for
          employee management, team communication, and scheduling—all seamlessly
          integrated into one platform.
        </p>
      </div>
      <div className="flex w-full max-w-[1200px] gap-4">
        <GraphicCards
          image={SectionGraphic1}
          title="Streamline your workforce."
          desc="Easily manage employee records, roles, and onboarding—all in one place."
        />
        <GraphicCards
          image={SectionGraphic2}
          title="Stay connected."
          desc="Empower your teams with real-time messaging and collaboration tools."
        />
        <GraphicCards
          image={SectionGraphic3}
          title="Plan with confidence."
          desc="Organize shifts, meetings, and tasks efficiently with intuitive scheduling features."
        />
      </div>
    </div>
  );
}
