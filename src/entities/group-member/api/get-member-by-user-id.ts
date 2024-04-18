import { useQuery } from '@tanstack/react-query';

import { queryKey, supabase } from '@/shared/lib';

const getGroupMemberListByUserId = async ({ queryKey }: { queryKey: Array<any> }) => {
  const { data, error } = await supabase
    .from('group_members')
    .select('*')
    .eq('user_id', queryKey[2]);
  if (error) throw error;
  return data;
};

export const useGroupMemberListByUserId = (userId?: string) => {
  return useQuery({
    queryKey: queryKey.groupMemberListByUserId(userId),
    queryFn: getGroupMemberListByUserId,
    enabled: !!userId,
  });
};
