import axios from "axios";
import { AxiosRequestConfig } from "@/api/base/interface/RequestConfig";
import makeRequestHeader from "@/api/base/makeRequestHeader";

const request = async <T>(
  url: string,
  config: AxiosRequestConfig
): Promise<T | undefined> => {
  const { baseUrl, method, params, data, timeout, onDownloadProgress } = config;
  const instance = axios.create({
    baseURL: baseUrl,
    method,
  });

  try {
    const response = await instance.request<T>({
      data,
      headers: await makeRequestHeader(config),
      params,
      url,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(`error message: ${error.message} ${url}`, error);
      if (error.request.status === 401) {
        console.log("error", error);
      }
      throw error;
    } else {
      console.log(`unexpected error: ${error}`);
    }
  }
};

export default request;
