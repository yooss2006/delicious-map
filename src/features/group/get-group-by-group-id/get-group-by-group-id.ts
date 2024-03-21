import { supabase } from '@/shared/lib';

export const getGroupByGroupId = async ({ queryKey }: { queryKey: Array<any> }) => {
  const { data, error } = await supabase.from('groups').select('*').eq('id', queryKey[1]);
  if (error) throw error;
  return data;
};
