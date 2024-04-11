import { useMutation } from '@tanstack/react-query';

import { supabase } from '@/shared/lib';

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess() {
      window.location.href = '/';
    },
  });
};
