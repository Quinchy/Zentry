import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Logo from "@/public/images/logo.svg"

export default function NavBar() {
  return (
    <nav className="absolute right-0 left-0 flex justify-center z-50">
      <div className="flex justify-between items-center w-full max-w-[1250px] py-10">
        <div className="flex items-center gap-2">
          <Image src={Logo} alt="Logo" width={40} priority />
          <h1 className="font-black text-3xl">Zentry</h1>
        </div>
        <div className="flex items-center gap-10">
          <Link href="/">Home</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          <Button asChild size={"xl"}>
            <Link href="/">Dashboard</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
