import React from 'react';
import { api_contacts } from '../api/contacts';
import { useGetContacts } from '../hooks/react-query/getContacts';
import { useLoading } from '../lib/loading';
import { openToast } from '../lib/toast';

export default function ContactCard({
  name,
  email,
  phone,
  avatar,
  _id,
  handleOpenForm,
}) {
  //state
  const { refetch } = useGetContacts();
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
    <div>
      <div className='group relative '>
        <div className='group-hover:opacity-100 opacity-0 absolute center-center-ab'>
          <button
            onClick={() => handleOpenForm({ name, email, phone, avatar, _id })}>
            Edit
          </button>
          <button onClick={handleDelete}>delete</button>
        </div>
        <img
          className='w-full h-full group-hover:bg-[rgba(0,0,0,.4)]'
          src={avatar}
          alt=''
        />
      </div>

      <p>{name}</p>
      <p>{email}</p>
      <p>{phone}</p>
    </div>
  );
}
