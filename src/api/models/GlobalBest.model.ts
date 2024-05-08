export interface GlobalBestResponse {
  id: string;
  createdAt: number;
  globalBestScore: number;
}

export interface GlobalBest {
  id: string;
  createdAt: number;
  globalBestScore: number | undefined;
}

const mapGlobalBest = (response: GlobalBestResponse): GlobalBest => {
  return {
    id: response.id,
    createdAt: response.createdAt,
    globalBestScore: response.globalBestScore ?? undefined,
  };
};

export default mapGlobalBest;
