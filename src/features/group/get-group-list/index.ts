import { supabase } from '@/shared/lib';

export const getGroupsByMyId = async ({ queryKey }: { queryKey: Array<any> }) => {
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
