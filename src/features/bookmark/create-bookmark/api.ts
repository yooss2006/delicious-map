import { BookmarkFormValue } from '@/entities/bookmark';
import { MerchantCardType } from '@/entities/merchant-card';
import { supabase } from '@/shared/lib';
import { uploadImageArray } from '@/shared/lib/supabase/upload-image';

import { formatJSON } from './lib';

export const createBookmark = async (
  values: BookmarkFormValue & MerchantCardType & { groupId: string; managerId: string }
) => {
  const uploadedImage = values.image;
  if (!uploadedImage) return;
  const imageUrl = await uploadImageArray({ images: uploadedImage, storageName: 'bookmark' });
  const payload = formatJSON({ ...values, image: imageUrl });
  const { data, error } = await supabase.from('bookmark').insert([payload]).select('*').single();
  if (error) throw error;
  return data;
};
