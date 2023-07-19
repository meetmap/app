import axios from "axios";
import { AUTH_URL } from "./baseUrl";

export interface RefreshTokenResponse {
  accessToken: string;
}
export const refreshAccessToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
  const { data } = await axios.post<RefreshTokenResponse>(`${AUTH_URL}/auth/refresh` , {
    refreshToken,
  },{
    withCredentials: false
  });
  return data;
};
