import { supabase } from '@/shared/lib';

export const createInvitation = async ({ groupId }: { groupId: string }) => {
  const { data, error } = await supabase
    .from('group_invitation')
    .insert([{ group_id: groupId }])
    .select();
  if (error) {
    throw error;
  }
  return data[0];
};
