import { useQuery } from '@tanstack/react-query';
import { api_contacts } from '../../api/contacts';
import { useState } from 'react';

export function useGetContacts() {
  const [itemPerPage, setItemPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ['get-contacts'],
    queryFn: () => api_contacts.getContacts(page, itemPerPage),
  });

  return {
    isPending,
    isError,
    data,
    error,
    refetch,
    setItemPerPage,
    setPage,
    itemPerPage,
    page,
  };
}
