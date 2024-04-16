import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { queryKey, supabase } from '@/shared/lib';

import { GroupMember } from './type';

const getGroupMember = async ({ queryKey }: { queryKey: Array<any> }) => {
  const { data, error } = await supabase
    .from('group_members')
    .select('*')
    .eq('group_id', queryKey[1]);
  if (error) throw error;
  return data as Array<GroupMember>;
};

export const useGroupMember = () => {
  const { id } = useParams();

  return useQuery({ queryKey: queryKey.groupMemberList(id), queryFn: getGroupMember });
};
