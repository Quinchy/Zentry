import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/shadcn/ui/sidebar";
import NavBar from "@/components/ui/layout/dashboard/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <NavBar />
      <SidebarInset>
        <main className="flex flex-col h-screen overflow-auto">
          <SidebarTrigger />
          <div className="ml-5">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
