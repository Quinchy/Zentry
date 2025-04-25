import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/logo.svg";

type LinkItem = {
  label: string;
  href: string;
};

type WebLinkContainerProps = {
  links: LinkItem[];
};

const WebLinkContainer = ({ links }: WebLinkContainerProps) => {
  return (
    <nav>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href} className="hover:underline text-sm">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default function Footer() {
  return (
    <div className="bg-dark-primary pt-20 pb-2 flex justify-center text-primary-foreground">
      <div className="flex flex-col items-center lg:items-stretch gap-10 w-full max-w-[90%] md:max-w-[75%] lg:max-w-[75%] xl:max-w-[65%]">
        <div className="flex gap-10 lg:flex-row flex-col items-start justify-between">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <Image src={Logo} alt="Logo" width={40} priority />
              <h1 className="font-black text-3xl">Zentry</h1>
            </div>
            <p className="text-primary-foreground/85 text-sm text-start">
              Bringing teams, tools, and tasks <br />
              into one seamless flow.
            </p>
          </div>
          <div className="flex flex-row gap-5 lg:gap-20">
            <div className="flex flex-col justify-start gap-2">
              <h1 className="font-bold">Quick Link</h1>
              <WebLinkContainer
                links={[
                  { label: "Home", href: "/" },
                  { label: "About", href: "/" },
                  { label: "Contact", href: "/" },
                ]}
              />
            </div>
            <div className="flex flex-col justify-start gap-2">
              <h1 className="font-bold">Company</h1>
              <WebLinkContainer
                links={[
                  { label: "About Us", href: "/" },
                  { label: "History", href: "/" },
                  { label: "Highlights", href: "/" },
                  { label: "Services", href: "/" },
                  { label: "Guide", href: "/" },
                ]}
              />
            </div>
            <div className="flex flex-col justify-start gap-2">
              <h1 className="font-bold">Legal</h1>
              <WebLinkContainer
                links={[
                  { label: "Terms of Service", href: "/" },
                  { label: "Privacy Policy", href: "/" },
                  { label: "Cookies", href: "/" },
                  { label: "Trust Center", href: "/" },
                ]}
              />
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-accent/50 pt-5 mb-2 border-t-[1px] border-t-border/25">
          © 2025 Zentry, Inc. - All rights reserved.
        </p>
      </div>
    </div>
  );
}
