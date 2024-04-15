import React from 'react';
import { useGetContacts } from '../hooks/react-query/getContacts';

export default function ContactsPage() {
  const { data } = useGetContacts();
  console.log(data);
  return <div>{'fdfkjdsk'}</div>;
}
