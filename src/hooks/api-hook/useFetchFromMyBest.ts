import fetchFromMyBestApi from "@/api/services/fetchFromMyBestApi";
import useSWRImmutable from "swr/immutable";

const getMyBest = () => {
  return fetchFromMyBestApi();
};

const useFetchFromMyBest = () => {
  const { data, isLoading } = useSWRImmutable(
    { url: "https://6629ff0a67df268010a2372d.mockapi.io/api/v1/my-best" },
    getMyBest
  );

  return { myBest: data || [], isLoading };
};

export default useFetchFromMyBest;
