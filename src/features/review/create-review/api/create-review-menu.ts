import { supabase } from '@/shared/lib';

export const createReviewMenu = async ([reviewId, menus]: [reviewId: number, menu: Array<any>]) => {
  const { data, error } = await supabase
    .from('review_menu')
    .insert(
      menus.map((menu) => ({
        review_id: reviewId,
        name: menu.name,
        rating: menu.rating,
        review: menu.review,
      }))
    )
    .select();

  if (error) {
    throw error;
  }
  return data;
};
