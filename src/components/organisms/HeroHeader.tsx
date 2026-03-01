import { Menu } from "lucide-react";

interface HeroHeaderProps {
  onMenuClick: () => void;
}

const HeroHeader = ({ onMenuClick }: HeroHeaderProps) => {
  return (
    <header className="flex w-full items-center justify-between px-4 py-6 sm:px-6 md:px-8">
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenuClick}
          className="flex size-9 shrink-0 items-center justify-center rounded-md text-white transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <Menu className="size-6" strokeWidth={1.5} />
        </button>
        <span className="text-lg font-bold uppercase tracking-tight text-white sm:text-xl">
          HOT-SPOT
        </span>
      </div>
      <span className="text-xs text-white/80 sm:text-sm">
        4°12&apos;S 332°48&apos;E
        <span className="ml-2 hidden sm:inline">MON 22.07</span>
      </span>
    </header>
  );
};

export { HeroHeader };
