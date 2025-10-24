import {
  Check,
  ChevronUp,
  Home,
  Inbox,
  LogOut,
  Settings,
  User,
  User2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CSSProperties } from "react";

// Menu items.
const items = [
  { title: "Dashboard", url: "/staff", icon: Home, activeIcon: Check },
  {
    title: "Quản lí trạm",
    url: "/staff/stations",
    icon: Inbox,
    activeIcon: Check,
  },

  {
    title: "Quản lí giao dịch",
    url: "/staff/transaction-management",
    icon: Inbox,
    activeIcon: Check,
  },
  {
    title: "Báo cáo",
    url: "/staff/reports",
    icon: Settings,
    activeIcon: Check,
  },
];

export function AppSidebar() {
  return (
    <Sidebar
      className="border-r bg-white text-slate-700 dark:bg-zinc-900 dark:text-zinc-100"
      style={{ ["--sidebar-width" as keyof CSSProperties]: "260px" }}
    >
      <SidebarHeader className="border-b px-4 py-3 dark:border-zinc-800">
        <div className="text-2xl font-semibold tracking-tight">
          EV BSS Staff
        </div>
        <div className="text-xs text-slate-500 dark:text-zinc-400">
          Control Panel
        </div>
      </SidebarHeader>

      <SidebarContent className="py-3">
        <SidebarGroup className="px-3">
          <SidebarGroupLabel className="mb-2 px-2 text-xl uppercase tracking-wider text-slate-400 dark:text-zinc-500">
            Application
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end>
                      {({ isActive }) => (
                        <div
                          className={`
            flex w-full items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors
            ${
              isActive
                ? "bg-slate-200 text-slate-900 dark:bg-zinc-800 dark:text-zinc-50 font-bold"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white font-semibold"
            }
          `}
                        >
                          {isActive ? (
                            <item.activeIcon className="h-4 w-4" />
                          ) : (
                            <item.icon className="h-4 w-4" />
                          )}
                          <span className="truncate">{item.title}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t px-3 py-3 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className={[
                    "h-11 w-full justify-start gap-2 rounded-lg px-3 text-sm",
                    "bg-white hover:bg-slate-100 text-slate-700",
                    "dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-100",
                    "border border-slate-200 dark:border-zinc-800",
                  ].join(" ")}
                  style={{ backgroundColor: "#fff" }}
                >
                  <User2 className="h-4 w-4" />
                  <span className="truncate">Tài khoản</span>
                  <ChevronUp className="ml-auto h-4 w-4 opacity-60" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                align="center"
                sideOffset={8}
                className={[
                  "w-[--radix-popper-anchor-width]",
                  "rounded-xl border border-slate-200 bg-white p-2 shadow-xl",
                  "dark:border-zinc-800 dark:bg-zinc-900",
                ].join(" ")}
              >
                <DropdownMenuItem
                  className={[
                    "flex items-center gap-2 rounded-md px-3 py-2",
                    "text-sm hover:bg-slate-100 focus:bg-slate-100",
                    "dark:hover:bg-zinc-800 dark:focus:bg-zinc-800",
                  ].join(" ")}
                >
                  <User className="h-4 w-4" />
                  <span>Thông tin tài khoản</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className={[
                    "flex items-center gap-2 rounded-md px-3 py-2",
                    "text-sm hover:bg-slate-100 focus:bg-slate-100",
                    "dark:hover:bg-zinc-800 dark:focus:bg-zinc-800",
                  ].join(" ")}
                >
                  <Settings className="h-4 w-4" />
                  <span>Cài đặt</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className={[
                    "mt-1 flex items-center gap-2 rounded-md px-3 py-2 text-red-600",
                    "hover:bg-red-50 focus:bg-red-50",
                    "dark:hover:bg-red-950/40 dark:focus:bg-red-950/40",
                  ].join(" ")}
                  // onSelect={(e) => { e.preventDefault(); logout(); }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
