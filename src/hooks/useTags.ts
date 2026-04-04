import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { fetch } from "@/services/tags";

import type { ApiMultipleResponseInterface } from "@/types/interface/ApiMultipleResponseInterface";
import type { ParamsInterface } from "@/types/interface/ParamsInterface";
import type { TagsOutput } from "@/schemas/shared/tagsSchema";

export function useTagFetch(
  enabled: boolean,
  options: ParamsInterface = {},
): UseQueryResult<ApiMultipleResponseInterface<TagsOutput>, Error> {
  return useQuery({
    queryKey: ["tags", options],
    queryFn: () => fetch(options),
    enabled,
  });
}
