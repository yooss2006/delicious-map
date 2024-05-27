import { supabase } from '@/shared/lib';

export const getSession = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  return user;
};
