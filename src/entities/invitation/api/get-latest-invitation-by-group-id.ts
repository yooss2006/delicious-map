import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { queryKey, supabase } from '@/shared/lib';

const getLatestInvitationByGroupId = async ({ queryKey }: { queryKey: Array<any> }) => {
  const { data, error } = await supabase
    .from('group_invitation')
    .select('*')
    .eq('group_id', queryKey[2]);
  if (error) throw error;
  return data.length > 0 ? data.at(-1) : null;
};

export const useLatestInvitationByGroupId = () => {
  const { id } = useParams();

  return useQuery({
    queryKey: queryKey.invitationByGroupId(id),
    queryFn: getLatestInvitationByGroupId,
  });
};
