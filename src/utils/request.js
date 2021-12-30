import axios from 'axios';
import config from '../config';
import { ElMessage } from 'element-plus';
import router from '../router';
const TOKEN_INVALID = 'Token认证失败，重新登录';
const NETWORT_ERROR = '网络请求异常，请稍后重试';

const service = axios.create({
  baseURL: config.baseApi,
  timeout: 10000
});

// 请求拦截
service.interceptors.request.use((req) => {
  const headers = req.headers;
  if (!headers.Authorization) headers.Authorization = 'Bear Jack';
  return req;
});

//响应拦截
service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data;
  if (code == 200) {
    return data;
  } else if (code == 401) {
    ElMessage.error(TOKEN_INVALID);
    router.push('/login');
    return Promise.reject(TOKEN_INVALID);
  } else {
    ElMessage.error(msg || NETWORT_ERROR);
    return Promise.reject(NETWORT_ERROR);
  }
});

function request(option) {
  option.method = option.method || 'get';
  if (option.method.toLowerCase() === 'get') {
    option.params = option.data;
  }

  if (config.env == 'prod') {
    service.defaults.baseURL = config.baseApi;
  } else {
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi;
  }
  return service(option);
}

['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
  request[item] = (url, data, options) => {
    return request({
      url,
      data,
      method: item,
      ...options
    });
  };
});

export default request;
