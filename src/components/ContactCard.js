import React, { Suspense } from 'react';
import { api_contacts } from '../api/contacts';

import { useLoading } from '../lib/loading';
import { openToast } from '../lib/toast';

import { FaDeleteLeft } from 'react-icons/fa6';
import { MdOutlineUpdate } from 'react-icons/md';
import { useContacts } from '../context/contacts';

export default function ContactCard({
  name,
  email,
  phone,
  avatar,
  _id,
  handleOpenForm,
}) {
  //state
  const { refetch } = useContacts();
  const { setIsLoading } = useLoading();
  // handle event
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await api_contacts.deleteContact(_id);
      await refetch();
      setIsLoading(false);
    } catch (error) {
      openToast({
        message: error.message || 'Opp! Something went wrong',
        type: 'error',
      });
      setIsLoading(false);
    }
  };
  return (
    <div className=' flex flex-col  gap-3  lg:h-[200px] border-[2px] rounded-lg  p-3 '>
      <div className='group relative flex justify-center h-[60%] '>
        <div className=' group-hover:opacity-100 opacity-0 absolute center-center-ab flex justify-center gap-3'>
          <button
            onClick={() => handleOpenForm({ name, email, phone, avatar, _id })}>
            <MdOutlineUpdate size={30} />
          </button>
          <button onClick={handleDelete}>
            <FaDeleteLeft size={30} />
          </button>
        </div>
        <img
          className='group-hover:bg-[rgba(0,0,0,.4)] lg:h-[80px] '
          src={avatar}
          alt=''
        />
      </div>
      <div className='w-full '>
        <p>{name}</p>
        <p>{email}</p>
        <p>{phone}</p>
      </div>
    </div>
  );
}
