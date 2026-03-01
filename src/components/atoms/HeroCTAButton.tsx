import { ArrowDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface HeroCTAButtonProps {
  className?: string;
  "aria-label"?: string;
}

const HeroCTAButton = ({
  className,
  "aria-label": ariaLabel = "Scroll or continue",
  ...props
}: HeroCTAButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={cn(
        "flex size-14 items-center justify-center rounded-full transition-transform duration-200 ease-out hover:scale-105 hover:opacity-95 active:scale-100",
        className
      )}
      style={{ backgroundColor: "#E75E43" }}
      {...props}
    >
      <ArrowDown className="size-6 text-white" strokeWidth={2.5} />
    </button>
  );
};

export { HeroCTAButton };
