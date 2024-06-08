import axios, { AxiosRequestConfig } from 'axios';
import { STORAGE } from '../config/storage';

export  type IConfig = AxiosRequestConfig & {
  showSpinner?: boolean
}

const config: IConfig = {
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  showSpinner: false
}

export const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(
  (config: any) => {
    console.log('request: ', config)
    if(config.showSpinner) {
      console.log('show spinner')
    }
    const access_token = window.localStorage.getItem(STORAGE.ACCESS_TOKEN);
    if(access_token) {
      // config.headers['x-auth-token'] = access_token;
      config.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

axiosInstance.interceptors.response.use(
  res => {
    return res;
  },
  async (error) => {
    console.log('response error: ', error)
    const statusCode = error.response.status;

    // request timeout
    if(error.code === 'ECONNABORTED') {
      console.log('ECONNABORTED')
    }

    // token expired
    if(statusCode === 401) {
      // http://localhost:3000/api/refresh_token
      const result: any = await axiosInstance.post('/api/refresh_token', {
        data: {
          refresh_token: 'xxx'
        }
      })
      const access_token = result.access_token;
      window.localStorage.setItem(STORAGE.ACCESS_TOKEN, access_token);
      axiosInstance.defaults.headers.Authorization = `Bearer ${access_token}`;

      return axiosInstance(error.config); // auto call api before
    };

    // other errors
    switch(statusCode) {
      case 400: {
        console.log('xxx');
        break
      }
      case 500: {
        console.log('xxx');
        break
      }
      case 502: {
        console.log('xxx');
        break
      }
      default: {
        console.log('xxx');
        break
      }
    }
    return Promise.reject(error);
  }
)