import { RequestConfig } from "@/api/base/interface/RequestConfig";
import request from "@/libs/utils/request";
import mapMyBest, { MyBest, MyBestResponse } from "@/api/models/MyBest.model";

const fetchFromMyBestApi = async (
  config?: RequestConfig
): Promise<MyBest[]> => {
  const response = await request<MyBestResponse[]>(
    `https://6629ff0a67df268010a2372d.mockapi.io/api/v1/my-best`,
    {
      ...config,
      method: "get",
    }
  );

  return response?.map(mapMyBest) || [];
};

export default fetchFromMyBestApi;
