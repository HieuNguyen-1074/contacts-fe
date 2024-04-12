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
function SignPage() {
  //hook statments
  const s = useAuth();
  const nagative = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(validateLoginForm),
  });

  const inputs = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password',
    },
  ];

  // handle event function
  const handleSubmitEvent = async (data) => {
    try {
      const user = await user_api.login(data);
      if (user.accessTooken) Cookies.set(TOOKENNAME, user.accessToken);
      if (user.refreshTooken)
        Cookies.set(REFRESH_TOKEN_NAME, user.refreshTooken);
      openToast({
        message: `Hello ${user?.username}`,
        type: 'success',
      });

      s.setUser(user);
      nagative('/', { replace: true });
    } catch (error) {
      openToast({
        message: error.message || `Opp! Something went wrong`,
        type: 'error',
      });
    }
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
              className='w-full  p-2 border-[3px] border-black rounded-lg mt-7 outline-none text-[1.5rem]'
              {...input}
              key={input.name}
              {...register(input.name)}
            />
            {/* {dirtyFields[input.name] && (
              <p className='right-center-ab text-[1.5rem] '>
                {errors[input.name] ? (
                  <IoCloseCircleSharp
                    className='mt-[3px]'
                    color='red'
                  />
                ) : (
                  <FcOk className='mt-[3px]' />
                )}
              </p>
            )} */}
          </div>
        );
      })}

      <input
        type='submit'
        value={'Login'}
        className='bg-white hover:bg-main text-black hover:text-white text-[1.5rem] font-bold w-full p-2 border-[3px] border-[black]  rounded-lg mt-9'
      />
    </form>
  );
}

export default SignPage;
