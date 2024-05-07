import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/shared/lib';

import { groupKeys } from '../queries';

const getGroupsByProfileId = async ({ queryKey }: { queryKey: Array<any> }) => {
  const { data: members, error: membersError } = await supabase
    .from('group_member')
    .select('*')
    .eq('profile_id', queryKey[2]);
  if (membersError) throw membersError;
  const membersGroupIds = members?.map((member) => member.group_id);
  const { data, error } = await supabase.from('group').select('*').in('id', membersGroupIds);
  if (error) throw error;
  return data;
};

export const useGroupListByProfileId = ({ profileId }: { profileId?: number }) => {
  return useQuery({
    queryKey: groupKeys.groupListByProfileId(profileId),
    queryFn: getGroupsByProfileId,
    refetchOnWindowFocus: false,
    enabled: !!profileId,
  });
};
