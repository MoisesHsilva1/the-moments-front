import { Home } from "lucide-react";
import * as React from "react";
import { useLocation, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Página Inicial", url: "/posts", icon: Home },
  // { title: "Perfil", url: "/profile", icon: User },
];

const SideBar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r border-white/5 bg-black text-white"
      {...props}
    >
      <SidebarContent className="bg-black py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 px-2">
              {navItems.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className="p-0 h-auto"
                    >
                      <Button
                        variant="ghost"
                        onClick={() => navigate(item.url)}
                        className={`group relative h-12 w-full justify-start gap-4 rounded-xl px-4 text-base font-semibold transition-all hover:bg-white/10 ${
                          isActive
                            ? "bg-white/5 text-white"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        <item.icon
                          className={`size-5 transition-colors ${
                            isActive
                              ? "text-[#E75E43]"
                              : "text-zinc-400 group-hover:text-white"
                          }`}
                          strokeWidth={isActive ? 2.5 : 2}
                        />
                        <span>{item.title}</span>

                        {isActive && (
                          <div
                            className="absolute left-[-8px] h-6 w-1 rounded-full bg-[#E75E43]"
                            aria-hidden="true"
                          />
                        )}
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 bg-black">
        <Button
          className="w-full rounded-full bg-[#E75E43] text-base font-bold text-white py-6 hover:bg-[#E75E43]/90"
          onClick={() => navigate("/posts/create")}
        >
          Postar
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
