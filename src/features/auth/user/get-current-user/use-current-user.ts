import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from './get-current-user';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['current_user'],
    queryFn: getCurrentUser,
    refetchOnWindowFocus: false,
  });
};
