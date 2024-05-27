import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { queryClient } from '@/shared/lib';

import { createGroup } from './api/create-group';
import { getGroupDetail } from './api/group-detail';
import { getGroupList } from './api/group-list';

export const groupKeys = {
  root: () => ['group'],
  groupList: (profileId?: number) =>
    profileId ? [...groupKeys.root(), 'list', profileId] : [...groupKeys.root(), 'list'],
  groupDetail: (groupId: string) => [...groupKeys.root(), groupId],
  createGroup: () => [...groupKeys.root(), 'create'],
};

export const GroupService = {
  queryKey: () => groupKeys.root(),
  queryOptions: (groupId: string) => {
    const queryKey = groupKeys.groupDetail(groupId);
    return queryOptions({
      queryKey,
      queryFn: getGroupDetail,
    });
  },
  invalidateQueries: () => {
    queryClient.invalidateQueries({ queryKey: groupKeys.groupList() });
  },
};

export const GroupListService = {
  queryKey: () => groupKeys.groupList(),
  queryOptions: (profileId?: number) => {
    const queryKey = groupKeys.groupList(profileId);
    return queryOptions({
      queryKey,
      queryFn: getGroupList,
      refetchOnWindowFocus: false,
      retry: false,
      ...(profileId && { enabled: true }),
    });
  },
};

export const useGroupDetailBySlug = () => {
  const { id = '' } = useParams();

  return useQuery(GroupService.queryOptions(id));
};

export const useCreateGroupMutation = () => {
  return useMutation({
    mutationKey: groupKeys.createGroup(),
    mutationFn: createGroup,
  });
};
