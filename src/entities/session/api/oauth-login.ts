import { Provider } from '@supabase/supabase-js';

import { supabase } from '@/shared/lib';

export const oAuthLogin = async (provider: Provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${import.meta.env.VITE_BASE_URL}/auth/create-profile`,
      skipBrowserRedirect: false,
    },
  });

  if (error) {
    throw error;
  }

  return data;
};
