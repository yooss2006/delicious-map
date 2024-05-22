import { supabase } from '@/shared/lib';
import { convertKeys } from '@/shared/lib/convert';

import { BookmarkMenuDto, CreateBookmarkMenuDto } from '../type';

export const createBookmarkMenu = async (payload: Array<BookmarkMenuDto>) => {
  const convertData = convertKeys('snake', payload) as Array<CreateBookmarkMenuDto>;
  const { data, error } = await supabase.from('bookmark_menu').insert(convertData).select('*');
  if (error) throw error;
  return data;
};
