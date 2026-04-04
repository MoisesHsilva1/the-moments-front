import { makeRequest } from "@/api/api";
import type { TagsOutput } from "@/schemas/shared/tagsSchema";
import type { ApiMultipleResponseInterface } from "@/types/interface/ApiMultipleResponseInterface";
import { type ParamsInterface } from "@/types/interface/ParamsInterface";
import { buildParams } from "@/utils/BuildParams";

export const fetch = (
  options: ParamsInterface = {},
): Promise<ApiMultipleResponseInterface<TagsOutput>> => {
  const url = buildParams("tags", options);

  return makeRequest.getList<TagsOutput>(url);
};
