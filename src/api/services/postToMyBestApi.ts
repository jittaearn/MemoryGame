import { RequestConfig } from "@/api/base/interface/RequestConfig";
import request from "@/libs/utils/request";
import { MyBest } from "@/api/models/MyBest.model";

const postToMyBestApi = async (
  payload: MyBest,
  config?: RequestConfig
): Promise<void> => {
  return await request(
    "https://6629ff0a67df268010a2372d.mockapi.io/api/v1/my-best/1",
    {
      ...config,
      method: "put",
      data: payload,
    }
  );
};

export default postToMyBestApi;
