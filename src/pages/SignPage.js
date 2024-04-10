import { useForm } from 'react-hook-form';
import { validateLoginForm } from '../lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { FcOk } from 'react-icons/fc';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { openToast } from '../lib/toast';

function SignPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: 'all',
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
  const handleSubmitEvent = (data) => {
    openToast({
      message: 'hello',
      type: 'warning',
    });
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
            {dirtyFields[input.name] && (
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
            )}
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
