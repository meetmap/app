import axios, {AxiosError} from 'axios';
import {EVENTS_URL, AUTH_URL, MAIN_APP_URL, API_BASE_URL} from './baseUrl';
import jwtDecode from 'jwt-decode';
import {refreshAccessToken} from './refreshAccessToken';
import {SecureStoreKeys} from '../constants/secure-store';
import {getFromSecureStore, setToSecureStore} from './secure-store';
import {store} from '../store/store';
import {setUserdata} from '../store/slices/userSlice';

type MicroserviceNames = 'auth' | 'users' | 'events' | 'location' | 'assets';

export const getAxios = (
  microserviceName: MicroserviceNames,
  auth: boolean,
) => {
  const _axios = axios.create({
    baseURL: `${API_BASE_URL}/${microserviceName}`,
    // withCredentials: true,
  });
  if (auth) {
    _axios.interceptors.request.use(async config => {
      const accessToken = await getFromSecureStore(
        SecureStoreKeys.ACCESS_TOKEN,
      );
      if (config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      if (isInvalidAccessToken(accessToken)) {
        const refreshToken = await getFromSecureStore(
          SecureStoreKeys.REFRESH_TOKEN,
        );
        if (!refreshToken) {
          throw new Error('Login first');
        }
        try {
          const response = await refreshAccessToken(refreshToken);
          if (config.headers) {
            config.headers.Authorization = `Bearer ${response.accessToken}`;
          }
          await setToSecureStore(
            SecureStoreKeys.ACCESS_TOKEN,
            response.accessToken,
          );
          return config;
        } catch (error) {
          if (
            error instanceof AxiosError &&
            error.response &&
            error.response.status === 401
          ) {
            store.dispatch(setUserdata(null));
          }
          throw error;
        }
      }
      return config;
    });
  }
  return _axios;
};

const isInvalidAccessToken = (token: string | null): boolean => {
  if (!token) {
    return true;
  }
  const decoded = jwtDecode<{iat: number; exp: number; sub: string}>(token);
  const isExpired = decoded.exp - Date.now() / 1000 <= 0;
  return isExpired;
};
