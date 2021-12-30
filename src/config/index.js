/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
  dev: {
    baseApi: '/',
    mockApi:
      'https://www.fastmock.site/mock/5ecc54ff8cad5926003c1ea88af0c12f/api'
  },
  test: {
    baseApi: '//test',
    mockApi:
      'https://www.fastmock.site/mock/5ecc54ff8cad5926003c1ea88af0c12f/api'
  },
  prod: {
    baseApi: '//prod',
    mockApi:
      'https://www.fastmock.site/mock/5ecc54ff8cad5926003c1ea88af0c12f/api'
  }
};

export default {
  env,
  mock: true,
  namespace: 'manager',
  ...EnvConfig[env]
};
