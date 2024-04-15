import React from 'react';
import { useGetContacts } from '../hooks/react-query/getContacts';
import ContactForm from '../components/ContactForm';

export default function HomePage() {
  const { data } = useGetContacts();
  console.log(data);
  return (
    <div>
      this is home page
      <ContactForm />
    </div>
  );
}
