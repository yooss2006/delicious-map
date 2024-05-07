import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { queryKey, supabase } from '@/shared/lib';

const getInvitationByLink = async ({ queryKey }: { queryKey: Array<any> }) => {
  const groupInvitationQuery = supabase
    .from('group_invitation')
    .select(
      `
        *,
        group (*)
      )
    `
    )
    .eq('link', queryKey[2]);
  const { data, error } = await groupInvitationQuery;
  if (error) throw error;
  const result = data as any;
  return result[0];
};

export const useInvitationByLink = () => {
  const { link } = useParams();

  return useQuery({
    queryKey: queryKey.invitationByLink(link),
    queryFn: getInvitationByLink,
  });
};
