import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';

import { BookmarkDto, useCreateBookmarkMutation } from '@/entities/bookmark';
import { BookmarkProvider } from '@/entities/bookmark/ui/bookmark-provider';
import { BookmarkMenuDto } from '@/entities/bookmark-menu';
import { Merchant } from '@/entities/merchant';
import { useProfile } from '@/entities/profile';

import { BookmarkEditor } from '../ui/bookmark-editor';

export function CreateBookmarkPage() {
  const location = useLocation();
  const locationState: (Merchant & { groupId: string }) | null = location.state;
  const { data: user } = useProfile();
  const { mutateAsync: createBookmark, isPending } = useCreateBookmarkMutation();

  if (!(locationState && user)) return null;

  const defaultData: BookmarkDto = {
    merchantId: locationState.merchantId,
    merchantName: locationState.name,
    address: locationState.address,
    lat: locationState.lat,
    lng: locationState.lng,
    groupId: locationState.groupId,
    type: locationState.code === 'FD6' ? 'restaurant' : 'cafe',
    rating: 0,
    review: '',
    visitDate: dayjs().format('YYYY-MM-DD'),
    image: [],
    managerId: user.id,
  };

  const onSubmit = async (values: BookmarkDto & { menus: Array<BookmarkMenuDto> }) => {
    const { menus, ...rest } = values;
    const bookmark = await createBookmark(rest);
    console.log(bookmark, menus);
    // if (!merchant || !user?.id || !groupId) return;
    // const result = await createBookmark({
    //   ...values,
    //   ...merchant,
    //   groupId: groupId,
    //   managerId: user.id,
    // });
    // await createReviewMenu([id!, menus]);
    // navigate(`/group/${groupId}`);
  };

  return (
    <BookmarkProvider data={defaultData} onSubmit={onSubmit} isLoading={isPending}>
      <BookmarkEditor />
    </BookmarkProvider>
  );
}
