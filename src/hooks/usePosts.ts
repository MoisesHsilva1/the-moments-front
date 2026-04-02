import {
  useQuery,
  type UseMutationResult,
  type UseQueryResult,
  useMutation,
} from "@tanstack/react-query";
import { fetch, create } from "@/services/posts";

import type { PostInput, PostOutput } from "@/schemas/postSchema";
import type { ApiMultipleResponseInterface } from "@/types/interface/ApiMultipleResponseInterface";
import type { ParamsInterface } from "@/types/interface/ParamsInterface";
import type { ApiSingleResponseInterface } from "@/types/interface/ApiSingleResponseInterface";

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

export function usePostCreate(): UseMutationResult<
  ApiSingleResponseInterface<PostOutput> | void,
  Error,
  PostInput
> {
  return useMutation({
    mutationFn: (data: PostInput) => create(data),
  });
}
