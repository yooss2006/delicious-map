import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { queryKey, supabase } from '@/shared/lib';

import { GroupMember } from '../type';

const getGroupMemberByGroupId = async ({ queryKey }: { queryKey: Array<any> }) => {
  const { data, error } = await supabase
    .from('group_members')
    .select('*')
    .eq('group_id', queryKey[2]);
  if (error) throw error;
  return data as Array<GroupMember>;
};

export const useGroupMemberByGroupId = () => {
  const { id } = useParams();

  return useQuery({
    queryKey: queryKey.groupMemberListByGroupId(id),
    queryFn: getGroupMemberByGroupId,
  });
};
