import { cn } from "@/lib/utils";

interface SidebarPostarButtonProps {
  className?: string;
  "aria-label"?: string;
}

const SidebarPostarButton = ({
  className,
  "aria-label": ariaLabel = "Postar",
  ...props
}: SidebarPostarButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={cn(
        "w-full rounded-full bg-[#E75E43] px-6 py-3 text-base font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
        className
      )}
      {...props}
    >
      Postar
    </button>
  );
};

export { SidebarPostarButton };
