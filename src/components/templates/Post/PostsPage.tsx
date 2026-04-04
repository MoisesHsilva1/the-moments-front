import { usePostInfiniteFetch } from "@/hooks/usePosts";
import PostCard from "../../molecules/PostCard";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
} as const;

const PostsPage: React.FC = () => {
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = usePostInfiniteFetch(true, 10);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const allPosts = data?.pages.flatMap((page) => page.rows) || [];

  return (
    <motion.div
      className="flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {isLoading && (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
          <Spinner className="size-8 text-[#E75E43]" />
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4 text-center">
          <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/20 max-w-md">
            <p className="text-red-500 font-semibold text-lg mb-1">
              Ops! Algo deu errado
            </p>
            <p className="text-zinc-400 text-sm">
              Não conseguimos carregar as postagens. Por favor, tente novamente
              em instantes.
            </p>
          </div>
        </div>
      )}

      {allPosts.map((post) => (
        <motion.div key={post.id} variants={itemVariants}>
          <PostCard
            title={post.title}
            content={post.body}
            image={post.imageUrl || ""}
            tags={post.tags}
            stars={post.stars}
          />
        </motion.div>
      ))}

      <div
        ref={ref}
        className="h-10 w-full flex items-center justify-center py-8"
      >
        {(isFetchingNextPage || hasNextPage) && (
          <Spinner className="size-6 text-[#E75E43]/50" />
        )}
        {!hasNextPage && allPosts.length > 0 && (
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest opacity-50">
            Você chegou ao fim das publicações
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default PostsPage;
