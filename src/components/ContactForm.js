import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// icon import
import { FaRegWindowClose } from 'react-icons/fa';
import { BsImage } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { CiSquarePlus } from 'react-icons/ci';
import { RxUpdate } from 'react-icons/rx';

import { logErrors, openToast } from '../lib/toast';
import { api_contacts } from '../api/contacts';
import { validateContactForm, validateImage } from '../lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoading } from '../lib/loading';
import { useContacts } from '../context/contacts';

//local constants
const inputs = {
  // all the input that appear in the left side of the form
  groupLeft: [
    {
      name: 'email',
      type: 'email',

      placeholder: 'Enter email',
    },
    {
      name: 'name',
      type: 'text',

      placeholder: 'Enter a name',
    },
    {
      name: 'phone',
      type: 'text',

      placeholder: 'Enter contatcs phone number',
    },
  ],
  // all the input that appear in the right side of the form
  groupRight: [
    {
      name: 'avatar',
      type: 'file',
    },
  ],
};

export default function ContactForm({ isOpenForm, handleClose, dataForm }) {
  //state
  const { refetch } = useContacts();

  // store base64/image url for display avatar image in screen
  const [avatarImage, setAvatarImage] = useState(null);

  //form state creation

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    trigger,
    watch,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(validateContactForm),
    mode: 'onSubmit',
  });
  //

  const { setIsLoading } = useLoading();
  /// effect
  useEffect(() => {
    logErrors(errors);
  }, [errors]);

  useEffect(() => {
    if (!dataForm) {
      setValue('email', null);
      setValue('name', null);
      setValue('phone', null);
      setValue('avatar', null);
      setAvatarImage(null);
    } else {
      for (const key in dataForm) {
        if (Object.hasOwnProperty.call(dataForm, key)) {
          const value = dataForm[key];
          setValue(key, value);
          if (key === 'avatar') {
            setAvatarImage(value);
          }
        }
      }
    }
  }, [dataForm, isOpenForm]);
  //handle event
  const handleSubmitEvent = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        const formDataContact = new FormData();
        formDataContact.append('email', data?.email);
        formDataContact.append('name', data?.name);
        formDataContact.append('phone', data?.phone);
        formDataContact.append(
          'avatar',
          typeof data?.avatar === 'string' ? data?.avatar : data?.avatar[0]
        );

        dataForm?._id
          ? await api_contacts.updateContact(dataForm?._id, formDataContact)
          : await api_contacts.createContact(formDataContact);
        await refetch();
        handleClose();
        setIsLoading(false);
      } catch (error) {
        openToast({
          message: error?.message || `Opp! Something went wrong`,
          type: 'error',
        });
        setIsLoading(false);
      }
    },
    [dataForm]
  );

  // handle events
  // onchange of input file(avatar field)
  const onChangeAvatar = async (e) => {
    try {
      const file = e?.target?.files.length ? e?.target?.files[0] : null;
      const base64Image = URL.createObjectURL(file);
      await validateImage.validate({ image: file });
      setAvatarImage(base64Image);
    } catch (error) {
      openToast({
        message: error?.message || 'Upload file error please try again!!!',
        type: 'error',
      });
    }
  };

  return (
    <div
      className={` contacts-form-bg ${
        isOpenForm
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0  pointer-events-none'
      }  bg-[rgba(0,0,0,0.4)] fixed top-0 left-0 w-screen h-screen transition-all flex justify-center items-center`}>
      <form
        onSubmit={handleSubmit(handleSubmitEvent)}
        className={` contacts-form ${
          isOpenForm ? 'ani-scaleAndBack' : ''
        } flex  flex-col w-[700px]  bg-white p-10 rounded-lg `}>
        <FaRegWindowClose
          onClick={() => handleClose(false)}
          className='text-[1.5rem] mx-auto cursor-pointer hover:scale-125'
        />
        <div className='flex justify-center items-center gap-2'>
          <div className='flex flex-col w-1/2'>
            {inputs.groupLeft.map((input) => {
              return (
                <input
                  {...input}
                  className='text-[1.2rem] p-3 border-[2px] mt-4 rounded-lg'
                  key={input.name}
                  {...register(input.name)}
                />
              );
            })}
          </div>

          <div className='w-1/2 flex justify-center items-center '>
            <AvatarInput
              register={register}
              onChangeAvatar={onChangeAvatar}
              avatarImage={avatarImage}
              setAvatarImage={() => {
                setValue('avatar', null);
                setAvatarImage(null);
              }}
            />
          </div>
        </div>
        <button
          type='submit'
          className={` ${
            dataForm?._id && 'border-[3px] rounded-lg'
          } w-fit mx-auto mt-4 hover:scale-75 transition-all`}>
          {dataForm?._id ? (
            <RxUpdate
              className='hover:rotate-180 transition-all'
              size={40}
            />
          ) : (
            <CiSquarePlus size={55} />
          )}
        </button>
      </form>
    </div>
  );
}

/**
 * the input file that for upload image avatar
 *
 * @returns
 */
function AvatarInput({
  register,
  onChangeAvatar,
  avatarImage,
  setAvatarImage,
}) {
  return (
    <>
      {avatarImage ? (
        <div className='w-full h-full relative group flex justify-center items-center'>
          <IoClose
            onClick={() => setAvatarImage(null)}
            className=' absolute  right-top-ab  transition-all  text-[2rem] opacity-0 hover:scale-125 hover:rotate-90 group-hover:opacity-100'
          />
          <img
            alt=''
            className='w-[200px] h-[200px] object-contain'
            src={avatarImage}
          />
        </div>
      ) : (
        inputs.groupRight.map((input) => {
          return (
            <div key={input.name}>
              <label>
                <div className='relative group cursor-pointer'>
                  <BsImage className='group-hover:text-[3rem] text-[4rem] center-center-ab group-hover:opacity-20 transition-all' />
                  <FaPlus className='center-center-ab bg-[rgba(#ffff)]  opacity-0  group-hover:opacity-100 group-hover:text-[4rem]' />
                </div>
                <input
                  {...input}
                  className='hidden'
                  key={input.name}
                  {...register(input.name, {
                    onChange: onChangeAvatar,
                  })}
                />
              </label>
            </div>
          );
        })
      )}
    </>
  );
}
