import type { z } from "zod";
import { setCookie, parseCookies } from 'nookies';
import authConfig from '@/utils/auth';


export type ClientConfig<T> = {
  data?: unknown;
  zodSchema?: z.ZodSchema<T>;
  method?: "DELETE" | "GET" | "OPTIONS" | "PATCH" | "POST" | "PUT";
  headers?: HeadersInit;
  customConfig?: RequestInit;
  signal?: AbortSignal;
};

export async function client<T>(
  url: string,
  {
    data,
    zodSchema,
    method,
    headers: customHeaders,
    signal,
    customConfig,
  }: ClientConfig<T> = {}
): Promise<T> {
  const token = parseCookies()[authConfig.storageTokenKeyName];
  const config: RequestInit = {
    method: method ?? (data ? "POST" : "GET"),
    body: data ? JSON.stringify(data) : null,
    headers: {
      "Content-Type": data ? "application/json" : "",
      Accept: "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...customHeaders,
    },
    signal,
    ...customConfig,
  };

  return window.fetch(url, config).then(async (response) => {
    // on gères le status 401
    const body = await response.json();
    if (response.status === 401) {
      return Promise.reject(new Error(body.message ?? "You're not authenticated"));
    }

    let result = null;
    try {
      result = response.status === 204 ? null : body;
    } catch (error: unknown) {
      return Promise.reject(error);
    }

    if (response.ok) {
      return zodSchema && result ? zodSchema.parse(result) : result;
    } else {
      return Promise.reject(result);
    }
  });
}
