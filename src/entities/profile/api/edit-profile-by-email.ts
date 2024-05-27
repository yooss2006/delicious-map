import { supabase } from '@/shared/lib';

import { EditProfileDto } from '../types';

export const editProfileByEmail = async ([email, values]: [
  email: string,
  values: EditProfileDto,
]) => {
  const { data, error } = await supabase
    .from('profile')
    .update({ image: values.image, name: values.name })
    .eq('email', email)
    .select('*')
    .single();

  if (error) throw error;

  return data;
};
