import { useQuery } from '@tanstack/react-query';

import { queryKey, supabase } from '@/shared/lib';

const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;

  return user;
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: queryKey.currentUser,
    queryFn: getCurrentUser,
    refetchOnWindowFocus: false,
  });
};
