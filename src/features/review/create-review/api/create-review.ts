import dayjs from 'dayjs';

import { Review } from '@/entities/review';
import { supabase } from '@/shared/lib';

export const createReview = async ({ image, ...rest }: Review) => {
  const images = await uploadImageFn(image);
  return await createReviewFn({ ...rest, image: images });
};

const uploadImageFn = async (images: Array<File>) => {
  if (images.length === 0) return [];
  return await Promise.all(
    images.map(async (image) => {
      const lastDotIndex = image?.name.lastIndexOf('.');
      const extension = image?.name.slice(lastDotIndex + 1);
      const { data, error } = await supabase.storage
        .from('review')
        .upload(`${dayjs().format('YYYY_MM_DD_HH_mm_ss')}.${extension}`, image, {
          cacheControl: '3600',
        });
      if (error) {
        throw error;
      }

      return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/review/${data.path}`;
    })
  );
};

const createReviewFn = async (payload: Omit<Review, 'image'> & { image: Array<string> }) => {
  const { merchantId, merchantName, groupId, visitDate, ...rest } = payload;
  const { data, error } = await supabase
    .from('review')
    .insert([
      {
        ...rest,
        merchant_id: merchantId,
        merchant_name: merchantName,
        group_id: groupId,
        visit_date: visitDate,
      },
    ])
    .select();
  if (error) {
    throw error;
  }
  return data[0]?.id;
};
