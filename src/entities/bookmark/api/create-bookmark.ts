import { supabase } from '@/shared/lib';
import { convertKeys } from '@/shared/lib/convert';
import { uploadImageArray } from '@/shared/lib/supabase/upload-image';

import { BookmarkDto, CreateBookmarkDto } from '../type';

const createBookmarkFn = async (values: CreateBookmarkDto) => {
  const { data, error } = await supabase.from('bookmark').insert([values]).select('*').single();
  if (error) throw error;
  return data;
};

export const createBookmark = async (payload: BookmarkDto) => {
  const data = convertKeys('snake', payload) as CreateBookmarkDto;
  if (data.image?.length) {
    const imageUrlArray = await uploadImageArray({ images: data.image, storageName: 'bookmark' });
    data.image = imageUrlArray;
  }
  return await createBookmarkFn(data);
};
