import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { createGroupMember } from '../api/create-group-member';
import { getGroupMemberListByProfileId } from '../api/get-member-by-user-id';

const keys = {
  root: () => ['group-member'],
  createMember: () => [...keys.root(), 'create'] as const,
  groupMemberListByGroupId: (groupId?: string) => [...keys.root(), groupId],
  groupMemberListByProfileId: (profileId?: number) => [...keys.root(), profileId],
};

export const useGroupMemberListByProfileId = (profileId?: number) => {
  return useQuery({
    queryKey: keys.groupMemberListByProfileId(profileId),
    queryFn: getGroupMemberListByProfileId,
    enabled: !!profileId,
  });
};

export const useCreateGroupMemberMutation = (groupId?: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: keys.createMember(),
    mutationFn: createGroupMember,
    onSuccess() {
      if (groupId) navigate(`/group/${groupId}`);
    },
  });
};
