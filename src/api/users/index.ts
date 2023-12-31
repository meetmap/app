// import axios from "axios"
// import { UsersUrl } from "../baseUrl"

import { IPartialUser, IUserSelf } from '@src/types/users';
import { getAxios } from '../axios';

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
    const { data } = await getAxios(
      'auth',
      false,
    ).post<ILoginWithUsernameResponse>('/auth/login', {
      username,
      password,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  const { data } = await getAxios('auth', false).post<ILoginWithUsernameResponse>(
    '/auth/login',
    {
      username,
      password,
    },
  );
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
  name: string;
  username: string;
  password: string;
  email: string;
  birthDate: Date;
}
export const createUser = async ({
  name,
  username,
  password,
  email,
  birthDate,
}: ICreateUser): Promise<ICreateUserResponse> => {
  const { data } = await getAxios('auth', false).post<ICreateUserResponse>(
    '/auth/signup',
    {
      name,
      username,
      password,
      email,
      birthDate,
    },
  );

  return data;
};

export const getUserSelf = async (): Promise<IUserSelf> => {
  const { data } = await getAxios('users', true).get<IUserSelf>('/users/me');
  return data;
};

export const searchUsersByQuery = async (
  query: string,
): Promise<IPartialUser[]> => {
  const { data } = await getAxios('users', true).get<IPartialUser[]>(
    '/users/find',
    {
      params: {
        q: query,
      },
    },
  );

  return data;
};

export const getUserById = async (id: string): Promise<IPartialUser> => {
  const { data } = await getAxios('users', true).get<IPartialUser>(
    `/users/get/${id}`,
  );

  return data;
};

export interface IUploadedImage {
  uri: string;
  type: string;
  name: string;
}

export interface IUploadImageResponce {
  uploadId: string,
  status: "pending" | "failed" | "succeed"
  assets: [
    {
      xs: string,
      s: string,
      m: string,
      l: string,
      xl: string,
      exact: string
    }
  ]
}


export interface IEditUserData { name: string | undefined, description: string | undefined }

export const updateUser = async ({ name, description }: IEditUserData): Promise<IPartialUser> => {
  const { data } = await getAxios('users', true).patch<IPartialUser>('/users/update', { name, description });

  return data;
};

export const changeUserProfilePicture = async (
  picture: IUploadedImage,
): Promise<IUploadImageResponce> => {
  const formData = new FormData();
  formData.append('photo', picture);
  const { data } = await getAxios('assets', true).post<IUploadImageResponce>(
    `/upload/avatar`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};

export const checkAssetsUploadStatus = async (
  uploadId: string,
): Promise<IUploadImageResponce> => {
  const { data } = await getAxios('assets', true).get<IUploadImageResponce>(`/upload/status/${uploadId}`);

  return data;
};
