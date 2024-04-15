import * as yup from 'yup';

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
  isSignin: yup.boolean(),
  username: yup.string().when('isSignin', {
    is: true,
    then: () =>
      yup
        .string()

        .required('Uername is required')
        .min(5, 'Username must be at least 5 characters'),
  }),
});

export { validateLoginForm };
