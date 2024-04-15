const { CONTACTS, REQUEST_TYPE } = require('./constant');
const { default: requestApi } = require('./handleResReq');

/**
 * get contacts
 * @returns
 */
const getContacts = (data) => {
  return requestApi(CONTACTS, 'GET', REQUEST_TYPE.JSON)
    .then((response) => JSON.parse(response.data))
    .catch((error) => {
      throw JSON.parse(error?.response?.data);
    });
};

export const api_contacts = {
  getContacts,
};
