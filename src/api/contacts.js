const { CONTACTS, REQUEST_TYPE } = require('./constant');
const { default: requestApi } = require('./handleResReq');

/**
 * get contacts
 * @returns
 */
const getContacts = (page, itemPerPage) => {
  return requestApi(
    CONTACTS + `?page=${page}&&itemPerPage=${itemPerPage}`,
    'GET',
    null,
    REQUEST_TYPE.JSON
  )
    .then((response) => JSON.parse(response.data))
    .catch((error) => {
      throw JSON.parse(error?.response?.data);
    });
};

/**
 * get contacts
 * @param data form data
 * @returns
 */
const createContact = (data) => {
  return requestApi(CONTACTS, 'POST', data, REQUEST_TYPE.FORM_DATA)
    .then((response) => JSON.parse(response.data))
    .catch((error) => {
      throw JSON.parse(error?.response?.data);
    });
};

/**
 * update contact
 * @param {*} id //
 * @param {*} data
 * @returns
 */

const updateContact = (id, data) => {
  return requestApi(CONTACTS + `/${id}`, 'PUT', data, REQUEST_TYPE.FORM_DATA)
    .then((response) => JSON.parse(response.data))
    .catch((error) => {
      throw JSON.parse(error?.response?.data);
    });
};

/**
 * delete a contact
 * @param id //
 * @returns
 */
const deleteContact = (id) => {
  return requestApi(CONTACTS + `/${id}`, 'DELETE', false, REQUEST_TYPE.JSON)
    .then((response) => JSON.parse(response.data))
    .catch((error) => {
      throw JSON.parse(error?.response?.data);
    });
};

export const api_contacts = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
