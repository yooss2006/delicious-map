import uniqid from 'uniqid';

import { supabase } from '@/shared/lib';

export const uploadImage = async ({
  image,
  storageName,
}: {
  image?: File;
  storageName: string;
}) => {
  if (!image) return '';
  const uniqueID = uniqid();
  const lastDotIndex = image?.name.lastIndexOf('.');
  const extension = image?.name.slice(lastDotIndex + 1);
  const { data, error } = await supabase.storage
    .from('images')
    .upload(`${storageName}/${uniqueID}.${extension}`, image, {
      cacheControl: '3600',
    });
  if (error) {
    throw error;
  }

  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/images/${data.path}`;
};
