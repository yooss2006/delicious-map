import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { queryClient } from '@/shared/lib';

import { createInvitation } from '../api/create-invitation';
import { getInvitationByLink } from '../api/get-invitation-by-link';
import { getLatestInvitationByGroupId } from '../api/get-latest-invitation-by-group-id';

const keys = {
  root: () => ['invitation'] as const,
  invitationByGroupId: (groupId?: string) => [...keys.root(), groupId],
  invitationByLink: (link: string) => [...keys.root(), 'link', link],
};

export const useInvitationByLink = () => {
  const { link = '' } = useParams();

  return useQuery({
    queryKey: keys.invitationByLink(link),
    queryFn: getInvitationByLink,
  });
};

export const useLatestInvitationByGroupId = () => {
  const { id } = useParams();

  return useQuery({
    queryKey: keys.invitationByGroupId(id),
    queryFn: getLatestInvitationByGroupId,
  });
};

export const useCreateInvitationMutation = () => {
  const { id } = useParams();

  return useMutation({
    mutationFn: createInvitation,
    onSuccess(data) {
      queryClient.setQueryData(keys.invitationByGroupId(id), data);
    },
  });
};
