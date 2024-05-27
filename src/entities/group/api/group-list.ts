import { supabase } from '@/shared/lib';

export const getGroupList = async ({ queryKey }: { queryKey: Array<any> }) => {
  const { data: memberList, error: memberListError } = await supabase
    .from('group_member')
    .select('*')
    .eq('profile_id', queryKey[2]);
  if (memberListError) throw memberListError;
  const membersGroupIds = memberList?.map((member) => member.group_id);
  const { data, error } = await supabase.from('group').select('*').in('id', membersGroupIds);
  if (error) throw error;
  return data;
};
