import { useQuery } from '@tanstack/react-query';
import { api_contacts } from '../../api/contacts';

export function useGetContacts() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['get-contacts'],
    queryFn: api_contacts.getContacts,
  });

  return { isPending, isError, data, error };
}
