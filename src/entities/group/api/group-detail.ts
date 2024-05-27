import { supabase } from '@/shared/lib';

export const getGroupDetail = async ({ queryKey }: { queryKey: Array<any> }) => {
  const { data, error } = await supabase
    .from('group')
    .select(`*, member: group_member (*, profile(*)), profile (*)`)
    .eq('id', queryKey[1]);
  if (error) throw error;
  return data[0];
};
