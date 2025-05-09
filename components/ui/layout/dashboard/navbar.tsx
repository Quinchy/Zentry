"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/shadcn/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/public/images/logo.svg";
import Image from "next/image";
import { Calendar, Home, User } from "lucide-react";
import { routes } from "@/routes";
const data = {
  menuItems: [
    {
      label: "Dashboard",
      href: routes.dashboard,
      icon: <Home/>,
    },
    {
      label: "Employee",
      href: routes.employee,
      icon: <User/>,
    },
    {
      label: "Timesheet",
      href: routes.timesheet,
      icon: <Calendar/>,
    },
  ],
};

export default function NavBar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 mt-5 mb-5">
          <Image src={Logo} alt="Logo" width={30} priority />
          <h1 className="font-black text-2xl text-primary truncate ">Zentry</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu >
          {data.menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href}>
                <SidebarMenuButton tooltip={item.label} className={pathname === item.href ? "bg-primary text-background hover:text-background hover:bg-primary/80 transition-all duration-300" : "text-foreground/75 transition-all duration-300"}>
                  {item.icon}
                  {item.label}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
