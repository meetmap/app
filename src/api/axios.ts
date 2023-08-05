import axios, { AxiosError } from 'axios';
import { EVENTS_URL, AUTH_URL, MAIN_APP_URL, API_BASE_URL } from './baseUrl';
import jwtDecode from 'jwt-decode';
import { refreshAccessToken } from './refreshAccessToken';
import { SecureStoreKeys } from '../constants/secure-store';
import { getFromSecureStore, setToSecureStore } from './secure-store';
import { store } from '../store/store';
import { setUserdata } from '../store/slices/userSlice';
import { showErrorModal } from '../store/slices/globalErrorSlice';
import AppError from '../utils/AppError';
import { t } from 'i18next';
import NetInfo from '@react-native-community/netinfo';

type MicroserviceNames = 'auth' | 'users' | 'events' | 'location' | 'assets';

export const getAxios = (
  microserviceName: MicroserviceNames,
  auth: boolean,
) => {
  const _axios = axios.create({
    baseURL: `${API_BASE_URL}/${microserviceName}`,
    // withCredentials: true,
  });
  const isNetworkConnected = async () => {
    const netInfoState = await NetInfo.fetch();
    return netInfoState.isConnected && netInfoState.isInternetReachable;
  };
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

  _axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.error(error)
      if (error.response) {
        const customError = new AppError(
          error.response.data.message || error.message,
          error.response.status
        );
        store.dispatch(showErrorModal(customError.message));
        throw customError;
      }
      if (error.request) {
        const connected = await isNetworkConnected();
        if (connected) {
          const customError = new AppError(t('failedGetResMessage'));
          store.dispatch(showErrorModal(customError.message));
          throw customError;
        } else {
          const networkError = new AppError(t('networkErrorMessage'));
          store.dispatch(showErrorModal(networkError.message));
          throw networkError;
        }
      }
      const customError = new AppError(t("unknownErrorMessage"));
      store.dispatch(showErrorModal(customError.message))
      throw customError;
    }
  );

  return _axios;
};

const isInvalidAccessToken = (token: string | null): boolean => {
  if (!token) {
    return true;
  }
  const decoded = jwtDecode<{ iat: number; exp: number; sub: string }>(token);
  const isExpired = decoded.exp - Date.now() / 1000 <= 0;
  return isExpired;
};
