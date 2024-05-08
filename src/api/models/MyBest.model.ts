export interface MyBestResponse {
  id: string;
  createdAt: number;
  myBestScore: number;
}

export interface MyBest {
  id: string;
  createdAt: number;
  myBestScore: number;
}

const mapMyBest = (response: MyBestResponse): MyBest => {
  return {
    id: response.id,
    createdAt: response.createdAt,
    myBestScore: response.myBestScore,
  };
};

export default mapMyBest;
