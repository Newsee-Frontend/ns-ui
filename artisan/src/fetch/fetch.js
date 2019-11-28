/*
 * Type of data handle for axios-api
 * You can use those fun in other js
 * created: 2017/9/30.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2017 Broccoli spring( gcx )
 */
/*==========================================================================================================================*/
import axios from 'axios';
import { Message } from 'element-ui';
import solveGetCache from './solveGetCache';

console.log('当前运行环境：', process.env);

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
  withCredentials: true,
  headers: {},
});

service.interceptors.request.use(
  config => {
    solveGetCache(config);
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  response => {
    const resData = response.data;
    if (resData && (resData.resultCode === '200' || resData.resultCode === 200)) {
      return Promise.resolve(resData);
    } else {
      Message({ message: resData.resultMsg, type: 'error', duration: 2000 }); //throw message error
      return Promise.reject(resData);
    }
  },
  error => {
    Message({ message: error.resultMsg, type: 'error', duration: 2000 }); //throw message error
    let errorInfo = error.data.error ? error.data.error.message : error.data;
    return Promise.reject(errorInfo);
  },
);

export default service;
