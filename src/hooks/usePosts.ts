import type { PostOutput } from "@/schemas/postSchema";
import type { ApiMultipleResponseInterface } from "@/types/interface/ApiMultipleResponseInterface";
import type { ParamsInterface } from "@/types/interface/ParamsInterface";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { fetch } from "@/services/posts";

export function usePostFetch(
  enabled: boolean,
  options: ParamsInterface = {},
): UseQueryResult<ApiMultipleResponseInterface<PostOutput>, Error> {
  return useQuery({
    queryKey: ["posts", options],
    queryFn: () => fetch(options),
    enabled,
  });
}
