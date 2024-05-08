import useSWRImmutable from "swr";

import fetchFromGlobalBestApi from "@/api/services/fetchFromGlobalBestApi";

const getGlobalBest = () => {
  return fetchFromGlobalBestApi();
};

const useFetchFromGlobalBest = () => {
  const { data, isLoading } = useSWRImmutable(
    { url: "https://6629ff0a67df268010a2372d.mockapi.io/api/v1/global-best" },
    getGlobalBest
  );

  return { globalBest: data || [], isLoading };
};

export default useFetchFromGlobalBest;
