import { makeRequest } from "@/api/api";
import type { PostOutput } from "@/schemas/postSchema";
import type { ApiMultipleResponseInterface } from "@/types/interface/ApiMultipleResponseInterface";
import { type ParamsInterface } from "@/types/interface/ParamsInterface";
import { buildParams } from "@/utils/BuildParams";

export const fetch = (
  options: ParamsInterface = {},
): Promise<ApiMultipleResponseInterface<PostOutput>> => {
  const url = buildParams("posts", options);

  return makeRequest.getList<PostOutput>(url);
};
