import {
  PUBLIC_PATH,
  REFRESH_TOKEN,
  REFRESH_TOKEN_NAME,
  TOOKENNAME,
} from './constant';

import Cookies from 'js-cookie';
import { user_api } from './users';
import axios from 'axios';

/**
 *
 * @param {*} endpoint url
 * @param {*} method method
 * @param {*} body
 * @param {*} responseType
 * @returns
 */
export default function requestApi(
  endpoint,
  method,
  body,
  responseType = 'application/json'
) {
  const headers = {
    'Accept': responseType,
    'Content-Type': responseType,
    'Access-Control-Allow-Origin': '*',
  };

  const instance = axios.create({ headers });

  instance.interceptors.request.use(_handleRequestSuccess, _handleRequestError);

  instance.interceptors.response.use(_handleResponseSuccess, (error) =>
    _handleResponseError(instance, error)
  );

  return instance.request({
    method: method,
    url: `${process.env.REACT_APP_API_URL}${endpoint}`,
    data: body ? body : undefined,
    responseType: responseType,
  });
}
// handle request from client
const _handleRequestSuccess = (config) => {
  const authToken = Cookies.get(TOOKENNAME) ?? '';

  const isPublicPath = PUBLIC_PATH.some((url) => config.url.includes(url));

  if (authToken) {
    !isPublicPath && (config.headers[`Authorization`] = `Bearer ${authToken}`);
  }
  console.log(config);
  return config;
};

const _handleRequestError = (error) => {
  return Promise.reject(error);
};
/// handle response from server

const _handleResponseSuccess = (response) => response;

async function _handleResponseError(instance, error) {
  const originConfig = error.config;

  if (error?.response?.status === 401) {
    const authTokenRefresh = Cookies.get(REFRESH_TOKEN_NAME) ?? '';

    if (!authTokenRefresh) {
      Cookies.remove(TOOKENNAME);
      Cookies.remove(REFRESH_TOKEN_NAME);
      window.location.href = '/signin';
      return;
    }

    try {
      const tookens = await user_api.refreshTooken(authTokenRefresh);
      Cookies.set(TOOKENNAME, tookens.accessTooken);
      Cookies.set(REFRESH_TOKEN_NAME, tookens.refreshTooken);
      originConfig.headers.set(
        'Authorization',
        'Bearer ' + tookens.accessToken
      );
      return instance(originConfig);
      //
    } catch (error) {
      console.log(error);
      Cookies.remove(TOOKENNAME);
      Cookies.remove(REFRESH_TOKEN_NAME);
      window.location.href = '/signin';
    }
  } else {
    return Promise.reject(error);
  }
}
