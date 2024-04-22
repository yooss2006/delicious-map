import { supabase } from '@/shared/lib';

export const getBookmarkByGroupId = async ({ queryKey }: { queryKey: Array<any> }) => {
  const { data, error } = await supabase.from('bookmark').select(`*`).eq('group_id', queryKey[2]);
  if (error) throw error;
  return data;
};
