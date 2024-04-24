import { createContext, useContext } from 'react';
import { useGetContacts } from '../hooks/react-query/getContacts';

const Contacts = createContext([]);

export default function ContactsProvider({ children }) {
  const { data, itemPerPage, page, setPage, refetch } = useGetContacts();

  return (
    <Contacts.Provider value={{ data, itemPerPage, page, setPage, refetch }}>
      {children}
    </Contacts.Provider>
  );
}

export function useContacts() {
  return useContext(Contacts);
}
