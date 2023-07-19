import { getAxios } from "../axios";

export interface UpdateUserLocationResponse {
  lat: number;
  lng: number;
}
export const updateUserLocation = async ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}): Promise<UpdateUserLocationResponse> => {
  const { data } = await getAxios("location-service", true).post<UpdateUserLocationResponse>("/users/update-location", {
    lat,
    lng,
  });
  return data;
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
