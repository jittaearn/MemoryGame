import { RequestConfig } from "@/api/base/interface/RequestConfig";
import request from "@/libs/utils/request";
import mapGlobalBest, {
  GlobalBest,
  GlobalBestResponse,
} from "@/api/models/GlobalBest.model";

const fetchFromGlobalBestApi = async (
  config?: RequestConfig
): Promise<GlobalBest[]> => {
  const response = await request<GlobalBestResponse[]>(
    `https://6629ff0a67df268010a2372d.mockapi.io/api/v1/global-best`,
    {
      ...config,
      method: "get",
    }
  );

  return response?.map(mapGlobalBest) || [];
};

export default fetchFromGlobalBestApi;
