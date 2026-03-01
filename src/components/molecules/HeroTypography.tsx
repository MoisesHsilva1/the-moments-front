import { cn } from "@/lib/utils";

interface HeroTypographyProps {
  className?: string;
}

const HeroTypography = ({ className }: HeroTypographyProps) => {
  return (
    <h1
      className={cn(
        "flex flex-col items-center justify-center text-center tracking-tight",
        className
      )}
    >
      <span className="mb-2 text-2xl font-medium text-gray-300 md:text-3xl">
        A resenha mais
      </span>
      <span className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text py-2 text-6xl font-extrabold text-transparent sm:text-7xl md:text-8xl">
        divertida
      </span>
      <span className="mt-4 text-xl font-medium text-gray-400 sm:text-2xl md:text-3xl max-w-md md:max-w-none text-balance">
        sobre os picos da cidade.
      </span>
    </h1>
  );
};

export { HeroTypography };