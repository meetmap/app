import axios from "axios";
import { EVENTS_URL, AUTH_URL, MAIN_APP_URL, API_BASE_URL } from "./baseUrl";
import jwtDecode from "jwt-decode";
import { refreshAccessToken } from "./refreshAccessToken";
import { SecureStoreKeys } from "../constants/secure-store";
import { getFromSecureStore, setToSecureStore } from "./secure-store";

type MicroserviceNames = "auth-service" | "main-app" | "events-fetcher" | "user-service" | "location-service"

export const getAxios = (microserviceName: MicroserviceNames, auth: boolean) => {
  const _axios = axios.create({
    baseURL: `${API_BASE_URL}/${microserviceName}`,
    // withCredentials: true,
  });
  if (auth) {
    _axios.interceptors.request.use(async (config) => {
      const accessToken = await getFromSecureStore(SecureStoreKeys.ACCESS_TOKEN);

      if (config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      if (isInvalidAccessToken(accessToken)) {
        const refreshToken = await getFromSecureStore(SecureStoreKeys.REFRESH_TOKEN);
        if (!refreshToken) {
          throw new Error("Login first");
        }
        const response = await refreshAccessToken(refreshToken);
        if (config.headers) {
          config.headers.Authorization = `Bearer ${response.accessToken}`;
        }
        await setToSecureStore(SecureStoreKeys.ACCESS_TOKEN, response.accessToken);
      }
      return config;
    });
  }
  return _axios
}

const isInvalidAccessToken = (token: string | null): boolean => {
  if (!token) {
    return true;
  }
  const decoded = jwtDecode<{ iat: number; exp: number; sub: string }>(token);
  const isExpired = decoded.exp - Date.now() / 1000 <= 0;
  return isExpired;
};
