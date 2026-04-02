import React, { useState } from "react";
import { Star } from "lucide-react";
import { Field } from "../ui/field";

interface StarRatingProps {
  value?: number | null;
  onChange: (value: number) => void;
  error?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  value = 0,
  onChange,
  error,
}) => {
  const [hover, setHover] = useState<number>(0);

  const currentRating = value ?? 0;

  return (
    <Field className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((starIdx) => (
          <button
            key={starIdx}
            type="button"
            className="group p-1 transition-transform focus:outline-none hover:scale-110"
            onClick={() => onChange(starIdx)}
            onMouseEnter={() => setHover(starIdx)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              className={`h-8 w-8 transition-colors duration-200 ${
                starIdx <= (hover || currentRating)
                  ? "fill-[#E75E43] text-[#E75E43]"
                  : "fill-transparent text-zinc-600 group-hover:text-zinc-500"
              }`}
            />
          </button>
        ))}
        {currentRating > 0 && (
          <span className="ml-2 text-sm font-medium text-zinc-400">
            {currentRating} / 5
          </span>
        )}
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </Field>
  );
};

export default StarRating;
