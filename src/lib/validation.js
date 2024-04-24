import * as yup from 'yup';
import { MAX_FILE_SIZE, validFileExtensions } from '../utils/constant';

const validateLoginForm = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')

    .when('isSignin', {
      is: true,
      then: () => yup.string().min(5, 'Password must be at least 5 characters'),
    }),
  're-password': yup.string().when(['isSignin'], {
    is: true,
    then: () =>
      yup
        .string()
        .oneOf([yup.ref('password'), null], "Password dosen't match")
        .required('Re password is required')

        .when('password', {
          is: '',
          otherwise: () =>
            yup
              .string()
              .oneOf([yup.ref('password'), null], "Password dosen't match"),
        }),
  }),

  username: yup.string().when('isSignin', {
    is: true,
    then: () =>
      yup
        .string()

        .required('Uername is required')
        .min(5, 'Username must be at least 5 characters'),
  }),
});

const validateImage = yup.object().shape({
  image: yup
    .mixed()
    .required('You need to provide a file')
    .test('fileSize', 'The file is too large', (value) => {
      if (value && typeof value === 'string') return true;
      return value && value?.size <= MAX_FILE_SIZE;
    })
    .test(
      'type',
      'Only the following formats are accepted: .jpeg, .jpg, .bmp, .pdf and .doc',
      (value) => {
        if (value && typeof value === 'string') return true;
        return (
          value && validFileExtensions.includes(value?.type?.split('/')[1])
        );
      }
    ),
});

const validateContactForm = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),

  name: yup.string().required('Name is required'),
  avatar: yup
    .mixed()
    .test('requireFile', 'You need to provide a file', (value) => {
      if (value && typeof value === 'string') return !!value;
      if (!value?.length) {
        return;
      }
      return true;
    })
    .test('fileSize', 'The file is too large', (value) => {
      if (value && typeof value === 'string') return true;
      if (value?.length) {
        return value && value[0].size <= MAX_FILE_SIZE;
      }

      return;
    })
    .test(
      'type',
      'Only the following formats are accepted: .jpeg, .jpg, .bmp, .pdf and .doc',
      (value) => {
        if (value && typeof value === 'string') return true;
        return (
          value && validFileExtensions.includes(value[0]?.type?.split('/')[1])
        );
      }
    ),
});
/**
 *
 * @param {*} fileName
 * @param {*} fileType
 * @returns
 */
function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1
  );
}

export { validateLoginForm, validateContactForm, validateImage };
