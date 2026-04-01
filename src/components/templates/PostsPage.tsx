import { usePostFetch } from "@/hooks/usePosts";
import PostCard from "../molecules/PostCard";

const PostsPage = () => {
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
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar posts</p>}
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
