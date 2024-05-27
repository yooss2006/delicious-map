import { supabase } from '@/shared/lib';

import { CreateProfileDto } from '../types';

export const createProfile = async ({ image, authId, ...rest }: CreateProfileDto) => {
  const { data, error } = await supabase
    .from('profile')
    .insert([
      {
        ...rest,
        auth_id: authId,
        image,
      },
    ])
    .select('*')
    .single();
  if (error) {
    throw error;
  }

  return data;
};
