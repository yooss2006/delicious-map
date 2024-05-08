import { supabase } from '@/shared/lib';

export const getInvitationByLink = async ({ queryKey }: { queryKey: Array<any> }) => {
  const groupInvitationQuery = supabase
    .from('group_invitation')
    .select(
      `
        *,
        group (*)
      )
    `
    )
    .eq('link', queryKey[2]);
  const { data, error } = await groupInvitationQuery;
  if (error) throw error;
  const result = data as any;
  return result[0];
};
