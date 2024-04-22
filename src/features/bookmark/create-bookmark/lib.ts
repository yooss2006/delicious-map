import { Bookmark, BookmarkFormValue } from '@/entities/bookmark';
import { MerchantCardType } from '@/entities/merchant-card';

export const formatJSON = (
  values: Omit<BookmarkFormValue, 'image'> &
    MerchantCardType & { groupId: string; managerId: string; image: Array<string> }
): Bookmark => {
  return {
    image: values.image,
    rating: values.rating,
    review: values.review,
    merchant_id: values.merchantId,
    merchant_name: values.name,
    type: values.code === 'FD6' ? 'restaurant' : 'cafe',
    group_id: values.groupId,
    visit_date: values.visitDate,
    manager_id: values.managerId,
    lat: Number(values.lat),
    lng: Number(values.lng),
  };
};
