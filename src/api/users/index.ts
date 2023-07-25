// import axios from "axios"
// import { UsersUrl } from "../baseUrl"

import { IPartialUser, IUserSelf } from "../../types/users";
import { getAxios } from "../axios";

export interface ILoginWithUsername {
  username: string;
  password: string;
}

export interface ILoginWithUsernameResponse {
  user: IUserSelf;
  tokens: {
    at: string;
    rt: string;
  };
}
export const loginWithUsername = async ({
  username,
  password,
}: ILoginWithUsername): Promise<ILoginWithUsernameResponse> => {
  try {

    const { data } = await getAxios("auth-service", false).post<ILoginWithUsernameResponse>("/auth/login", {
      username,
      password,
    });
    console.log(data)
  } catch (error) {
    console.log(error)
  }
  const { data } = await getAxios("auth-service", false).post<ILoginWithUsernameResponse>("/auth/login", {
    username,
    password,
  });
  return data;
};

export interface ICreateUserResponse {
  user: IUserSelf;
  tokens: {
    at: string;
    rt: string;
  };
}

export interface ICreateUser {
  username: string;
  password: string;
  email: string;
  birthDate: Date;
}
export const createUser = async ({
  username,
  password,
  email,
  birthDate,
}: ICreateUser): Promise<ICreateUserResponse> => {
  const { data } = await getAxios("auth-service", false).post<ICreateUserResponse>("/auth/signup", {
    username,
    password,
    email,
    birthDate,
  });

  return data;
};

export const getUserSelf = async (): Promise<IUserSelf> => {
  const { data } = await getAxios("main-app", true).get<IUserSelf>("/users/me")
  return data;
};

export const searchUsersByQuery = async (query: string): Promise<IPartialUser[]> => {
  const { data } = await getAxios("main-app", true).get<IPartialUser[]>("/users/find", {
    params: {
      q: query,
    },
  });

  return data;
};

export const getUserById = async (id: string): Promise<IPartialUser> => {
  const { data } = await getAxios("main-app", true).get<IPartialUser>(`/users/get/${id}`);

  return data;
};

export interface IUploadedImage {
  uri: string;
  type: string;
  name: string;
}

export const changeUserProfilePicture = async (picture: IUploadedImage): Promise<IUserSelf> => {
  const formData = new FormData();
  formData.append("photo", picture);
  console.log(formData)
  const { data } = await getAxios("main-app", true).post<IUserSelf>(`/users/profile/picture`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
