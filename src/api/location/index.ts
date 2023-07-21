import { ICoordinates, ILocation } from "../../types/location";
import { getAxios } from "../axios";

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
  const { data } = await getAxios("location-service", true).post<UpdateUserLocationResponse>("/location/update", {
    lat,
    lng,
  });
  return {
    lat: data.location.lat,
    lng: data.location.lng
  };
};

export interface GetFriendsLocationResponse {
  userId: string;
  location: {
    lat: number;
    lng: number;
  } | null;
}
export const getUpdatedFriendsLocation = async (): Promise<GetFriendsLocationResponse[]> => {
  const { data } = await getAxios("location-service", true).get<GetFriendsLocationResponse[]>("/friends/location");
  return data;
};
