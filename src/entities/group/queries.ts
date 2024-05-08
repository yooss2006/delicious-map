import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { queryClient } from '@/shared/lib';

import { createGroup } from './api/create-group';
import { getGroupByGroupId } from './api/group-detail';

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

export const useGroupDetail = () => {
  const { id = '' } = useParams();

  return useQuery({ queryKey: groupKeys.groupDetail(id), queryFn: getGroupByGroupId });
};

export const useCreateGroupMutation = () => {
  return useMutation({
    mutationKey: groupKeys.createGroup(),
    mutationFn: createGroup,
  });
};
