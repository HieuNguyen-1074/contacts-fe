import { useForm } from 'react-hook-form';
import { validateLoginForm } from '../lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';

import { openToast } from '../lib/toast';
import { user_api } from '../api/users';
import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import { LOGIN, REFRESH_TOKEN_NAME, TOOKENNAME } from '../api/constant';
import requestApi from '../api/handleResReq';
import { useEffect, useState } from 'react';

import { FaHandPointRight } from 'react-icons/fa';
import { FcOk } from 'react-icons/fc';
import { IoCloseCircleSharp } from 'react-icons/io5';

//local constants
const inputs = [
  {
    name: 'email',
    type: 'email',
    isInputSign: false,
    placeholder: 'Enter your email',
  },
  {
    name: 'username',
    type: 'text',
    isInputSign: true,
    placeholder: 'Enter a name',
  },
  {
    name: 'password',
    type: 'password',
    isInputSign: false,
    placeholder: 'Enter your password',
  },
  {
    name: 're-password',
    type: 'password',
    isInputSign: true,
    placeholder: 'Enter your password again',
  },
];
const statusForm = {
  LOGIN: 'login',
  SIGNIN: 'signin',
};
function SignPage() {
  //hook statments
  const { setUser } = useAuth();
  const [isSignin, setIsSign] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    watch,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(validateLoginForm),
    mode: 'all',
    reValidateMode: 'all',
    defaultValues: {
      isSignin,
    },
  });

  const nagative = useNavigate();

  watch('password', () => {
    console.log('first');
    reset('re-password');
  });
  //effects
  useEffect(() => {
    for (const key in errors) {
      if (Object.hasOwnProperty.call(errors, key)) {
        const error = errors[key];
        if (error) openToast(error);
      }
    }
  }, [errors]);
  //
  useEffect(() => {
    const isSigninFormEnabled = JSON.parse(localStorage.getItem('isSignin'));
    setIsSign(isSigninFormEnabled);
  }, []);
  //
  useEffect(() => {
    reset();
    setValue('isSignin', isSignin);
  }, [isSignin]);
  // handle event function
  /**
   * Submit form
   * @param {*} data
   */
  const handleSubmitEvent = async (data) => {
    try {
      /// this is for creating account
      if (isSignin) {
        try {
          delete data.isSignin;
          const user = await user_api.signUser(data);
          if (user) {
            openToast({
              message: `Welcome ${user?.username}`,
              type: 'success',
            });
            setIsSign(false);
          }
        } catch (error) {
          openToast({
            message: error?.message || `Opp! Something went wrong`,
            type: 'error',
          });
        }

        return;
      }
      // this is for login
      delete data.isSignin;
      delete data['re-password'];
      delete data.username;
      const user = await user_api.login(data);
      if (user.accessTooken) Cookies.set(TOOKENNAME, user.accessTooken);
      if (user.refreshTooken)
        Cookies.set(REFRESH_TOKEN_NAME, user.refreshTooken);
      openToast({
        message: `Hello ${user?.username}`,
        type: 'success',
      });

      setUser(user);
      nagative('/', { replace: true });
    } catch (error) {
      openToast({
        message: error?.message || `Opp! Something went wrong`,
        type: 'error',
      });
    }
  };

  const switchForm = () => {
    localStorage.setItem('isSignin', !isSignin);
    setIsSign(!isSignin);
  };
  return (
    <form
      className=' center-center-ab w-[400px] h-[400px]'
      onSubmit={handleSubmit(handleSubmitEvent)}>
      {inputs.map((input) => {
        return (
          <div
            className='relative'
            key={input.name}>
            <input
              className={` ${
                !isSignin && input.isInputSign ? 'hidden' : ''
              } w-full  p-2 border-[3px] border-black rounded-lg mt-7 outline-none text-[1.5rem]`}
              {...input}
              key={input.name}
              {...register(input.name)}
            />
            {/* {
              <p className='right-center-ab text-[1.5rem] '>
                {isSignin &&
                  dirtyFields[input.name] &&
                  (errors[input.name] ? (
                    <IoCloseCircleSharp
                      className='mt-[3px]'
                      color='red'
                    />
                  ) : (
                    <FcOk className='mt-[3px]' />
                  ))}
              </p>
            } */}
          </div>
        );
      })}

      <input
        type='submit'
        value={isSignin ? 'Sign' : 'Login'}
        className='bg-white hover:bg-main text-black hover:text-white text-[1.5rem] font-bold w-full p-2 border-[3px] border-[black]  rounded-lg mt-9'
      />
      <div
        className='flex items-center gap-3 mt-5 w-fit'
        onClick={switchForm}>
        <p>{isSignin ? 'Wanna login?' : 'Need a account?'}</p>
        <div className='flex items-center group gap-2'>
          <FaHandPointRight className='group-hover:text-main cursor-pointer scale-150 group-hover:scale-100 group-hover:underline inline-block transition-all' />
          <span className='group-hover:text-main cursor-pointer group-hover:scale-110 group-hover:underline inline-block transition-all'>
            There
          </span>
        </div>
      </div>
    </form>
  );
}

export default SignPage;
