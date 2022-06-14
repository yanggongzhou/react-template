import axios, { Method, AxiosResponse, AxiosError, AxiosRequestConfig, AxiosPromise } from 'axios'
import { getToken, getUserId } from '@/utils/cookies';
import { resetToken } from '@/store/modules/user.module';
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RootState } from "@/store";
import { Store } from "redux";

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
    // store: RootState
  }
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

const initAxios = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

}

// 取消重复请求
const pending: PendingType[] = [];
const CancelToken = axios.CancelToken;
const Service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/dzapi' : '/dzapi',
  withCredentials: true,
  timeout: 5000
});

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
          // navigate('/login')
          // 清除用户信息
          // dispatch(resetToken());
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
  (err: AxiosError) => {
    console.log('axios err--------------------------->', err)
    const navigator = window.navigator
    if (!navigator.onLine) {
      notification.error({ message: 'offline', placement: 'topRight' });
    // } else if (err.response?.status === 401) {
    //   notification.error({ message: '登录失效', placement: 'topRight' });
    //   //   navigate('/401')
    // } else if (err.response?.status === 404) {
    //   navigate('/404')
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
