import { IPartialUser } from "../../types/users";
import { getAxios } from "../axios";


export interface GetSelfFriendsResponse extends IPartialUser {}
export const getUserFriends = async (userСId: string): Promise<GetSelfFriendsResponse[]> => {
  const { data } = await getAxios("main-app", true).get<GetSelfFriendsResponse[]>("/friends/get/".concat(userСId));
  return data;
};

export const rejectFriendship = async (friendCId: string): Promise<IPartialUser> => {
  const { data } = await getAxios("main-app", true).post<IPartialUser>("/friends/reject", {
    friendCId,
  });
  return data;
};

export const acceptFriendship = async (friendCId: string): Promise<IPartialUser> => {
  const { data } = await getAxios("main-app", true).post<IPartialUser>("/friends/accept", {
    friendCId,
  });
  return data;
};

export const requestFriendship = async (friendCId: string): Promise<IPartialUser> => {
  const { data } = await getAxios("main-app", true).post<IPartialUser>("/friends/request", {
    friendCId,
  });
  return data;
};

export const getIncomingFrienshipRequests = async (): Promise<GetSelfFriendsResponse[]> => {
  const { data } = await getAxios("main-app", true).get<GetSelfFriendsResponse[]>("/friends/incoming");
  return data;
};

export const getOutcomingFrienshipRequests = async (): Promise<GetSelfFriendsResponse[]> => {
  const { data } = await getAxios("main-app", true).get<GetSelfFriendsResponse[]>("/friends/outcoming");
  return data;
};
