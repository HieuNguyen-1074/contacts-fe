import { useQuery } from '@tanstack/react-query';
import { api_contacts } from '../../api/contacts';
import { useEffect, useState } from 'react';
import { useLoading } from '../../lib/loading';
import { openToast } from '../../lib/toast';
import { useAuth } from '../../AuthProvider';

export function useGetContacts() {
  const [itemPerPage, setItemPerPage] = useState(5);
  const { setIsLoading } = useLoading();
  const [page, setPage] = useState(1);

  const { user } = useAuth();

  const { isPending, isError, data, error, refetch, status } = useQuery({
    queryKey: ['get-contacts'],
    queryFn: () =>
      window.location.pathname !== '/signin' &&
      api_contacts.getContacts(page, itemPerPage),
  });
  useEffect(() => {
    if (status === 'pending') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      if (status === 'error') {
        openToast({ message: 'Opps ! Something went wrong', type: 'error' });
      }
    }
  }, [status]);

  useEffect(() => {
    refetch();
  }, [page, user]);
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
