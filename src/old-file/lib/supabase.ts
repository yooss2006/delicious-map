import { createClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';

import { Image } from '@/old-file/types/image';
import { Post } from '@/old-file/types/post';
import { Database } from '@/shared/lib/supabase/type';

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const uploadImage = async (image: Array<File>) => {
  if (image.length === 0) return [];
  const imageUploadPromises = image.map((image: File) =>
    supabase.storage.from('images').upload(`${dayjs().format('YYYY_MM_DD_HH_mm_ss')}.jpg`, image, {
      cacheControl: '3600',
    })
  );
  try {
    const results = await Promise.all(imageUploadPromises);
    if (results.find((result) => result.error)) {
      throw new Error('Error uploading images');
    }
    return results
      .filter(({ data }) => data?.path)
      .map(({ data }) => ({
        ...data,
        url: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/images/${data?.path}`,
      })) as Array<Image>;
  } catch (error) {
    throw new Error('Error uploading images');
  }
};

export const uploadPost = async (postData: Post) => {
  const { data, error } = await supabase.from('merchant').insert([postData]);
  if (error) {
    throw new Error('Error uploading post');
  }
  return data;
};
