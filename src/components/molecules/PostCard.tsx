import type { TagsInput } from "@/schemas/shared/tagsSchema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Star } from "lucide-react";

interface PostCardProps {
  title: string;
  avatar?: string;
  content: string;
  image?: string;
  tags?: TagsInput[];
  stars?: number | null;
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  content,
  image,
  tags,
  stars,
}) => {
  return (
    <Card className="bg-black border-white/10 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between gap-3 p-4 pb-0 space-y-0">
        {/* <Avatar className="w-10 h-10 border border-white/10 cursor-pointer hover:opacity-80 transition-opacity">
          <AvatarImage
            src={avatar}
            alt={`${title}'s avatar`}
            className="object-cover"
          />
        </Avatar> */}

        <CardTitle className="text-white text-2xl font-bold">{title}</CardTitle>

        {typeof stars === "number" && (
          <Badge
            variant="outline"
            className="bg-[#E75E43]/10 px-3 py-1.5 border-[#E75E43]/20"
            title={`${stars} estrelas`}
          >
            <span className="text-xs font-bold text-[#E75E43] leading-none">
              {stars.toFixed(1)}
            </span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((starIndex) => {
                const fillPercentage = Math.max(
                  0,
                  Math.min(100, (stars - starIndex + 1) * 100),
                );

                return (
                  <div key={starIndex} className="relative size-3.5">
                    <Star className="absolute inset-0 size-3.5 text-[#E75E43]/30" />

                    <Star
                      className="absolute inset-0 size-3.5 fill-[#E75E43] text-[#E75E43]"
                      style={{
                        clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </Badge>
        )}
      </CardHeader>

      <CardContent className="flex flex-col px-4 pt-1 pb-3">
        <p className="text-zinc-100 text-[15px] whitespace-pre-wrap leading-relaxed break-words">
          {content}
        </p>

        {image && (
          <div className="mt-4 w-full aspect-square sm:aspect-video relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 flex justify-center items-center">
            <div
              className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-125"
              style={{ backgroundImage: `url(${image})` }}
            />
            <img
              src={image}
              alt={`Post content by ${title}`}
              className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
              loading="lazy"
            />
          </div>
        )}
      </CardContent>

      {tags && tags.length > 0 && (
        <CardFooter className="flex flex-wrap gap-2 px-4 pb-4 pt-1">
          {tags.map((tag, index) => (
            <Badge
              key={tag.id || index}
              variant="outline"
              className="transition-colors cursor-pointer px-3 py-1 text-sm font-medium bg-[#E75E43]/10 text-[#E75E43] border-[#E75E43]/20 hover:bg-[#E75E43]/20"
            >
              {tag.name}
            </Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  );
};

export default PostCard;
