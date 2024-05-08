import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getBookmarkByGroupId } from './api/get-bookmark-by-group-id';

const keys = {
  root: () => ['bookmark'],
  groupBookmarkList: (groupId: string) => [...keys.root(), 'group', groupId],
};

export const useGroupBookmarkList = (enabled: boolean) => {
  const { id = '' } = useParams();

  return useQuery({
    queryKey: keys.groupBookmarkList(id),
    queryFn: getBookmarkByGroupId,
    enabled,
  });
};
