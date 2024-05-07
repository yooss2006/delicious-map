import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { queryClient, queryKey, supabase } from '@/shared/lib';

export const createInvitation = async ({ groupId }: { groupId: string }) => {
  const { data, error } = await supabase
    .from('group_invitation')
    .insert([{ group_id: groupId }])
    .select();
  if (error) {
    throw error;
  }
  return data[0];
};

export const useCreateInvitation = () => {
  const { id } = useParams();

  return useMutation({
    mutationFn: createInvitation,
    onSuccess(data) {
      queryClient.setQueryData(queryKey.invitationByGroupId(id), data);
    },
  });
};
