import { Provider } from '@supabase/supabase-js';

import { supabase } from '@/shared/lib';

export const socialLogin = async (provider: Provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({ provider });

  if (error) {
    throw error;
  }

  return data;
};
