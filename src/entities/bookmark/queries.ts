import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { createBookmark } from './api/create-bookmark';
import { getBookmarkByGroupId } from './api/get-bookmark-by-group-id';

const keys = {
  root: () => ['bookmark'],
  groupBookmarkList: (groupId: string) => [...keys.root(), 'group', groupId],
  createBookmark: () => [...keys.root(), 'create'],
};

export const useGroupBookmarkList = (enabled: boolean) => {
  const { id = '' } = useParams();

  return useQuery({
    queryKey: keys.groupBookmarkList(id),
    queryFn: getBookmarkByGroupId,
    enabled,
  });
};

export const useCreateBookmarkMutation = () => {
  return useMutation({
    mutationKey: keys.createBookmark(),
    mutationFn: createBookmark,
  });
};
