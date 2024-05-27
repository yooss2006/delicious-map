import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';

import { BookmarkDto, useCreateBookmarkMutation } from '@/entities/bookmark';
import { BookmarkProvider } from '@/entities/bookmark/ui/bookmark-provider';
import { BookmarkMenuDto } from '@/entities/bookmark-menu';
import { useCreateBookmarkMenuMutation } from '@/entities/bookmark-menu/queries';
import { Merchant } from '@/entities/merchant';
import { profileQueries } from '@/entities/profile';

import { BookmarkEditor } from '../ui/bookmark-editor';

export function CreateBookmarkPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const locationState: (Merchant & { groupId: string }) | null = location.state;
  const profile = profileQueries.profileService.getCache();
  const { mutateAsync: createBookmark, isPending: isBookmarkPending } = useCreateBookmarkMutation();
  const { mutateAsync: createBookmarkMenu, isPending: isMenuPending } =
    useCreateBookmarkMenuMutation();

  if (!(locationState && profile?.id)) return null;
  const isLoading = isBookmarkPending || isMenuPending;

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
    managerId: profile.id,
  };

  const onSubmit = async (values: BookmarkDto & { menus: Array<BookmarkMenuDto> }) => {
    const { menus, ...rest } = values;
    const bookmark = await createBookmark(rest);
    const result = await createBookmarkMenu(
      menus.map((menu) => ({ ...menu, bookmarkId: bookmark.id }))
    );
    if (result) {
      navigate(`/group/${locationState.groupId}`);
    }
  };

  return (
    <BookmarkProvider data={defaultData} onSubmit={onSubmit} isLoading={isLoading}>
      <BookmarkEditor />
    </BookmarkProvider>
  );
}
