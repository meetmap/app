import { ICoordinates } from "@src/types/location";
import { getAxios } from "../axios";

function newAbortSignal(timeoutMs: number) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}

export interface UpdateUserLocationResponse {
  cid: string
  id: string
  location: ICoordinates
}


export const updateUserLocation = async ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}): Promise<ICoordinates> => {
  const { data } = await getAxios("location", true).post<UpdateUserLocationResponse>("/location/update", {
    lat,
    lng,
  });
  return {
    lat: data.location.lat,
    lng: data.location.lng
  };
};

export interface GetFriendsLocationResponse {
  id: string;
  cid: string
  username: string
  name?: string
  profilePicture: string
  location: {
    lat: number;
    lng: number;
  };
  locationUpdatedAt: string
}
export const getUpdatedFriendsLocation = async (): Promise<GetFriendsLocationResponse[]> => {
  const { data } = await getAxios("location", true).get<GetFriendsLocationResponse[]>("/location/friends", {signal: newAbortSignal(3000)});
  return data;
};
