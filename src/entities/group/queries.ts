import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/shared/lib';

import { createGroup } from './api/create-group';

export const groupKeys = {
  root: () => ['group'],
  groupList: () => [...groupKeys.root(), 'list'],
  groupListByProfileId: (id?: number) => [...groupKeys.root(), 'list', id],
  groupDetail: (groupId: string) => [...groupKeys.root(), groupId],
  createGroup: () => [...groupKeys.root(), 'create'],
};

export const GroupService = {
  refreshGroupList: () => {
    queryClient.invalidateQueries({ queryKey: groupKeys.groupList() });
  },
};

export const useCreateGroupMutation = () => {
  return useMutation({
    mutationKey: groupKeys.createGroup(),
    mutationFn: createGroup,
  });
};
