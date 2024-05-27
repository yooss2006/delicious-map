import { supabase } from '@/shared/lib';

export const getProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  if (user) {
    const { data } = await supabase.from('profile').select('*').eq('auth_id', user.id).single();

    return data;
  }
};

export const getProfileByEmail = async (email: string) => {
  const { data } = await supabase.from('profile').select('*').eq('email', email).single();

  return data;
};
