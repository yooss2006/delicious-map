import dayjs from 'dayjs';

import { supabase } from '@/shared/lib';

export const uploadImage = async (image: File) => {
  const lastDotIndex = image?.name.lastIndexOf('.');
  const extension = image?.name.slice(lastDotIndex + 1);
  const { data, error } = await supabase.storage
    .from('group')
    .upload(`${dayjs().format('YYYY_MM_DD_HH_mm_ss')}.${extension}`, image, {
      cacheControl: '3600',
    });
  if (error) {
    throw error;
  }

  return data;
};
