import { supabase } from '@/shared/lib';

type FormValues = {
  name: string;
  description: string;
  image_url: string;
};

export const createGroup = async (formValue: FormValues) => {
  const { data, error } = await supabase.from('groups').insert([formValue]).select();
  if (error) {
    throw error;
  }
  return data[0];
};
