import { supabase } from '@/shared/lib';

export const getGroupMemberListByProfileId = async ({ queryKey }: { queryKey: Array<any> }) => {
  const { data, error } = await supabase
    .from('group_member')
    .select('*')
    .eq('profile_id', queryKey[1]);
  if (error) throw error;
  return data;
};
