import { Lang } from "@/types/SearchParams";
import { AxiosProgressEvent, AxiosRequestConfig as AxiosConfig } from "axios";

export interface RequestConfig {
  accessToken?: string;
  baseUrl?: string;
  headers?: Record<string, string>;
  lang?: Lang;
  params?: AxiosConfig["params"];
  withCredentials?: boolean;
  timeout?: number;
  data?: Record<string, number | string | undefined> | object;
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
}

export interface AxiosRequestConfig extends RequestConfig {
  method: "delete" | "get" | "post" | "put";
}
