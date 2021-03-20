import { getSecureValue, setSecureValue } from '@boot/keychain';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@constants';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { DEV_BASE_URL } from '@secrets';
import { Auth } from '@services';
import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';

export const API = axios.create({ baseURL: DEV_BASE_URL });

API.interceptors.request.use(
  async (req): Promise<AxiosRequestConfig> => {
    const netInfo: NetInfoState = await NetInfo.fetch();
    const { isConnected } = netInfo;

    if (!isConnected) {
      throw new Error('No Internet connection');
    }

    return req;
  },
);

interface IExecutor<T = any> {
  resolve: (value?: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

let isRefreshing = false;
let failedQueue: IExecutor[] = [];

const processQueue = (error, token: string | null = null): Promise<void> =>
  new Promise((finish) => {
    failedQueue.forEach(({ reject, resolve }: IExecutor) =>
      error ? reject(error) : resolve(token),
    );
    failedQueue = [];

    finish();
  });

API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { config, response } = error;

    if (response?.status === 401) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((accessToken) => requestFailedReq(accessToken, config))
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      return refreshTokenAction(error);
    }

    return Promise.reject(error);
  },
);

const refreshTokenAction = async (error: AxiosError): Promise<any> => {
  const prevAccessToken = await getSecureValue(ACCESS_TOKEN);
  const prevRefreshToken = await getSecureValue(REFRESH_TOKEN);

  if (!prevAccessToken || !prevRefreshToken) {
    return Promise.reject(error);
  }

  try {
    const { data } = await Auth.refresh(prevRefreshToken);
    const { tokens } = data;
    const { accessToken, refreshToken } = tokens;

    await setSecureValue(ACCESS_TOKEN, accessToken);
    await setSecureValue(REFRESH_TOKEN, refreshToken);

    await processQueue(null, accessToken);
    isRefreshing = false;

    return requestFailedReq(accessToken, error.config);
  } catch (e) {
    return Promise.reject(e);
  }
};

const requestFailedReq = (accessToken: string, config: AxiosRequestConfig): AxiosPromise => {
  const errorConfig = { ...config };

  errorConfig.headers = {
    ...errorConfig.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  return API(errorConfig);
};
