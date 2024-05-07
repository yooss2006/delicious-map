import { useMutation } from '@tanstack/react-query';

import { createGroupMember } from '../api/create-group-member';

const keys = {
  root: () => ['group-member'],
  createMember: () => [...keys.root(), 'create'] as const,
};

export const useCreateGroupMemberMutation = () => {
  return useMutation({
    mutationKey: keys.createMember(),
    mutationFn: createGroupMember,
  });
};
