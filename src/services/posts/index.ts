import { makeRequest } from "@/api/api";
import type { PostInput, PostOutput } from "@/schemas/postSchema";
import type { ApiMultipleResponseInterface } from "@/types/interface/ApiMultipleResponseInterface";
import type { ApiSingleResponseInterface } from "@/types/interface/ApiSingleResponseInterface";
import { type ParamsInterface } from "@/types/interface/ParamsInterface";
import { buildParams } from "@/utils/BuildParams";

export const fetch = (
  options: ParamsInterface = {},
): Promise<ApiMultipleResponseInterface<PostOutput>> => {
  const url = buildParams("posts", options);

  return makeRequest.getList<PostOutput>(url);
};

export const create = (
  data: PostInput,
): Promise<ApiSingleResponseInterface<PostOutput> | void> => {
  const formData = new FormData();

  if (data.image) {
    formData.append("image", data.image);
  }

  const { image, ...postData } = data;

  formData.append(
    "post",
    new Blob([JSON.stringify(postData)], { type: "application/json" }),
  );

  return makeRequest.post<PostOutput>("posts", formData);
};
