import { supabase } from '@/shared/lib';

export const getLatestInvitationByGroupId = async ({ queryKey }: { queryKey: Array<any> }) => {
  const { data, error } = await supabase
    .from('group_invitation')
    .select('*')
    .eq('group_id', queryKey[1]);
  if (error) throw error;
  return data.length > 0 ? data.at(-1) : null;
};
