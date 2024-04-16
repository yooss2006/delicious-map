import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/shared/lib';

const getGroupsByMyId = async ({ queryKey }: { queryKey: Array<any> }) => {
  const { data: members, error: membersError } = await supabase
    .from('group_members')
    .select('*')
    .eq('user_id', queryKey[1]);
  if (membersError) throw membersError;
  const membersGroupIds = members?.map((member) => member.group_id);
  const { data, error } = await supabase.from('groups').select('*').in('id', membersGroupIds);
  if (error) throw error;
  return data;
};

export const useGroupList = ({ userId }: { userId?: string }) => {
  return useQuery({
    queryKey: ['group_list', userId],
    queryFn: getGroupsByMyId,
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });
};
