import axios, { Method, AxiosResponse, AxiosError, AxiosRequestConfig, AxiosPromise } from 'axios'
import { getToken, getUserId } from '@/utils/cookies';
import { resetToken } from '@/store/modules/user.module';
import { notification } from "antd";
import { RootState } from "@/store";
import { Store } from "redux";
import { NavigateFunction } from "react-router/lib/hooks";

// 定义接口
interface PendingType {
  url?: string;
  method?: Method | string;
  params: any;
  data: any;
  cancel: () => void;
}

declare module 'axios' {
  export interface AxiosInstance {
    redux: Store<RootState>;
    navigate: NavigateFunction;
    // store: RootState
  }
  export interface AxiosResponse<T = any> extends Promise<T> {}
}


// 取消重复请求
const pending: PendingType[] = [];
const CancelToken = axios.CancelToken;
const Service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/dzapi' : '/dzapi',
  withCredentials: true,
  timeout: 5000
});

export const initAxios = (store: Store<RootState>, navigate: NavigateFunction) => {
  if (!Service.redux) {
    Object.defineProperty(Service, 'redux', {
      get() {
        return store;
      },
    });
    Object.defineProperty(Service, 'navigate', {
      get() {
        return navigate;
      },
    });
    window.addEventListener('pageshow', () => initAxios(store, navigate));
  }
  // 校验带过期时间的token等
  // 5分钟检查一次token等信息
  // setTimeout(() => initAxios(store), 5 * 60 * 1000);
}

// 添加请求拦截器
Service.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    request.headers = {
      ...request.headers,
      userToken: getToken() || '',
      userId: getUserId() || ''
    }
    request.cancelToken = new CancelToken((c: any) => {
      pending.push({
        url: request.url,
        method: request.method,
        params: request.params,
        data: request.data,
        cancel: c
      });
    });
    return request;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
Service.interceptors.response.use(
  (response: AxiosResponse): AxiosPromise<any> => {
    try {
      if (response.data.retCode !== 0) {
        if (response.data.retCode === 6) {
          Service.navigate('/login');
          // 清除用户信息
          Service.redux.dispatch(resetToken());
          notification.error({ message: '登录失效', placement: 'topRight' });
        }
        notification.error({ message: response.data.retMsg, placement: 'topRight' })
        return Promise.reject(response.data.retMsg)
      }
      return response.data.data
    } catch (err) {
      return Promise.reject(err)
    }
  },
  (err: AxiosError): any => {
    console.log('axios err--------------------------->', err)
    const navigator = window.navigator
    if (!navigator.onLine) {
      notification.error({ message: 'offline', placement: 'topRight' });
    // } else if (err.response?.status === 401) {
    //   notification.error({ message: '登录失效', placement: 'topRight' });
    //   Service.navigate('/401')
    // } else if (err.response?.status === 404) {
    //   Service.navigate('/404')
    } else if (err.response) {
      const { data } = err.response
      // notification.error({ message: (data as any)?.message || '', placement: 'topRight' })

    } else {
      notification.error({ message: 'network error', placement: 'topRight' });
    }
    return Promise.reject(err)
  }
);

export default Service;
