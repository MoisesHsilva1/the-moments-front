import { type ParamsInterface } from "@/types/interface/ParamsInterface";

export const buildParams = (
  url: string,
  { limit, offset, params = {} }: ParamsInterface,
): string => {
  const separator = url.includes("?") ? "&" : "?";
  let queryString = `${url}${separator}`;
  const parts: string[] = [];

  if (limit !== undefined) parts.push(`limit=${limit}`);
  if (offset !== undefined) parts.push(`offset=${offset}`);

  for (const property in params) {
    const value = params[property];

    if (value === "" || value === null || value === undefined) continue;

    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      value.forEach((val) => {
        parts.push(
          `${encodeURIComponent(property)}=${encodeURIComponent(val)}`,
        );
      });
    } else {
      parts.push(
        `${encodeURIComponent(property)}=${encodeURIComponent(value)}`,
      );
    }
  }

  return queryString + parts.join("&");
};
