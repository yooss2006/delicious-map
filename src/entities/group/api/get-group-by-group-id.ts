import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { queryKey, supabase } from '@/shared/lib';

export const getGroupByGroupId = async ({ queryKey }: { queryKey: Array<any> }) => {
  const { data, error } = await supabase
    .from('groups')
    .select(`*, members: group_members (*)`)
    .eq('id', queryKey[1]);
  if (error) throw error;
  return data[0];
};

export const useGroupDetail = () => {
  const { id } = useParams();

  return useQuery({ queryKey: queryKey.groupDetail(id), queryFn: getGroupByGroupId });
};