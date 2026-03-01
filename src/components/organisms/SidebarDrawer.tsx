import { Home, Search, User, X } from "lucide-react";

import { SidebarPostarButton } from "@/components/atoms/SidebarPostarButton";
import { cn } from "@/lib/utils";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Página Inicial", icon: Home },
  { label: "Explorar", icon: Search },
  { label: "Perfil", icon: User },
] as const;

const SidebarDrawer = ({ isOpen, onClose }: SidebarDrawerProps) => {
  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ease-out",
          isOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        )}
        onClick={onClose}
        tabIndex={isOpen ? 0 : -1}
      />
      <aside
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-72 max-w-[85vw] flex-col bg-zinc-950 shadow-xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-1 flex-col px-4 py-6">
          <div className="flex items-center justify-end">
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="flex size-10 items-center justify-center rounded-2xl text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <X className="size-6" strokeWidth={1.5} />
            </button>
          </div>
          <nav className="mt-4 flex flex-1 flex-col gap-1" aria-label="Main navigation">
            <ul className="flex flex-col gap-1">
              {menuItems.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-base font-bold text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  >
                    <Icon className="size-5 shrink-0" strokeWidth={1.5} />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <SidebarPostarButton className="w-full" />
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export { SidebarDrawer };
