import { IPaginateRespose } from "@src/types/response";
import { IPartialUser } from "@src/types/users";
import { getAxios } from "../axios";


export type GetSelfFriendsResponse = IPartialUser

export const getUserFriends = async (userСId: string): Promise<IPaginateRespose<IPartialUser>> => {
  const { data } = await getAxios("users", true).get<IPaginateRespose<IPartialUser>>("/friends/get/".concat(userСId));
  return data;
};

export const rejectFriendship = async (friendCId: string): Promise<IPartialUser> => {
  const { data } = await getAxios("users", true).post<IPartialUser>("/friends/reject", {
    friendCId,
  });
  return data;
};

export const acceptFriendship = async (friendCId: string): Promise<IPartialUser> => {
  const { data } = await getAxios("users", true).post<IPartialUser>("/friends/accept", {
    friendCId,
  });
  return data;
};

export const requestFriendship = async (friendCId: string): Promise<IPartialUser> => {
  const { data } = await getAxios("users", true).post<IPartialUser>("/friends/request", {
    friendCId,
  });
  return data;
};

export const getIncomingFrienshipRequests = async (): Promise<IPaginateRespose<IPartialUser>> => {
  const { data } = await getAxios("users", true).get<IPaginateRespose<IPartialUser>>("/friends/incoming");
  return data;
};

export const getOutcomingFrienshipRequests = async (): Promise<IPaginateRespose<IPartialUser>> => {
  const { data } = await getAxios("users", true).get<IPaginateRespose<IPartialUser>>("/friends/outcoming");
  return data;
};
export const getFriendsListByCId = async (userCId: string): Promise<IPaginateRespose<IPartialUser>> => {
  const { data } = await getAxios("users", true).get<IPaginateRespose<IPartialUser>>(`/friends/get/${userCId}`);
  return data;
};
