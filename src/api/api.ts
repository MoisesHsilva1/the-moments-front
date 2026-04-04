import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

import { type ApiMultipleResponseInterface } from "@/types/interface/ApiMultipleResponseInterface";
import { type ApiSingleResponseInterface } from "@/types/interface/ApiSingleResponseInterface";

import Environment from "../config/env";

export const axiosAPI: AxiosInstance = axios.create({
  // Se VITE_BACKEND_URL estiver vazio, usaremos caminhos relativos
  // Isso ativa o proxy (/api) da Vercel em produção
  baseURL: Environment.VITE_BACKEND_URL 
    ? `${Environment.VITE_BACKEND_URL}/api/v1/`
    : "/api/v1/",
});

const makeRequest = {
  getList: async <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiMultipleResponseInterface<T>> => {
    const response = await axiosAPI.get<ApiMultipleResponseInterface<T>>(
      url,
      config,
    );

    return response.data;
  },

  get: async <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiSingleResponseInterface<T> | any> => {
    const response = await axiosAPI.get<ApiSingleResponseInterface<T> | any>(
      url,
      config,
    );

    return response.data;
  },

  post: async <T = void>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T extends void ? void : ApiSingleResponseInterface<T>> => {
    const mergedConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...(config?.headers || {}),
      },
    };

    const response = await axiosAPI.post(url, data, mergedConfig);

    return response.data;
  },

  put: async <T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiSingleResponseInterface<T>> => {
    const response = await axiosAPI.put<ApiSingleResponseInterface<T>>(
      url,
      data,
      config,
    );

    return response.data;
  },

  delete: async (url: string, config?: AxiosRequestConfig): Promise<void> => {
    await axiosAPI.delete(url, config);
  },
};

export { makeRequest };
