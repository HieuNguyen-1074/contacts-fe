import {
  GET_USER,
  LOGIN,
  REFRESH_TOKEN,
  REGISTER,
  REQUEST_TYPE,
} from './constant';

import requestApi from './handleResReq';

// /**
//  * get tooken and user database on email and password
//  * @param {*} data it must be include email and password as a parameter
//  * @returns
//  */
const login = (data) => {
  return requestApi(LOGIN, 'POST', data, REQUEST_TYPE.JSON)
    .then((response) => JSON.parse(response.data))
    .catch((error) => {
      throw JSON.parse(error?.response?.data);
    });
};
/**
 * get  new tooken from expired tooken
 * @param {*} tooken
 * @returns
 */
const refreshTooken = (tooken) => {
  return requestApi(
    REFRESH_TOKEN,
    'POST',
    { refreshTooken: tooken },
    REQUEST_TYPE.JSON
  )
    .then((response) => JSON.parse(response.data))
    .catch((error) => {
      throw JSON.parse(error?.response?.data);
    });
};

/**
 * get data user
 * @returns
 */
const getUser = () => {
  return requestApi(GET_USER, 'GET', null, REQUEST_TYPE.JSON)
    .then((response) => JSON.parse(response.data))
    .catch((error) => {
      throw JSON.parse(error?.response?.data);
    });
};

/**
 * get data user
 * @returns
 */
const signUser = (data) => {
  return requestApi(REGISTER, 'POST', data, REQUEST_TYPE.JSON)
    .then((response) => JSON.parse(response.data))
    .catch((error) => {
      throw JSON.parse(error?.response?.data);
    });
};

export const user_api = {
  login,
  getUser,
  refreshTooken,
  signUser,
};
