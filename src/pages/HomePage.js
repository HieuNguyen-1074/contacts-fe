import React, { useState } from 'react';
import { useGetContacts } from '../hooks/react-query/getContacts';
import ContactForm from '../components/ContactForm';
import ContactCard from '../components/ContactCard';

export default function HomePage() {
  //state
  const { data } = useGetContacts();
  console.log(data);
  const [isOpenForm, setIsOpenForm] = useState(false);
  // handle events

  const handleClose = (isOpen) => {
    setIsOpenForm(isOpen);
  };
  return (
    <div>
      <button onClick={handleClose}>click here</button>
      {data &&
        data.map((contact) => {
          return <ContactCard {...contact} />;
        })}

      <ContactForm
        isOpenForm={isOpenForm}
        handleClose={handleClose}
      />
    </div>
  );
}
