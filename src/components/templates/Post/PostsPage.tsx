import { usePostFetch } from "@/hooks/usePosts";
import PostCard from "../../molecules/PostCard";
import { Spinner } from "@/components/ui/spinner";

const PostsPage: React.FC = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = usePostFetch(true, {
    limit: 99,
    offset: 0,
  });

  return (
    <div className="flex flex-col gap-6">
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

      {posts?.rows.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          content={post.body}
          image={post.imageUrl}
          tags={post.tags}
          stars={post.stars}
        />
      ))}
    </div>
  );
};

export default PostsPage;
