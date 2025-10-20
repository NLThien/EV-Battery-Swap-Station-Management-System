import { SidebarProvider } from "@/components/ui/sidebar";
import type React from "react";
import { AppSidebar } from "./components/AppSidebar";

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="max-w-7xl">{children}</main>
    </SidebarProvider>
  );
}

export default Sidebar;
