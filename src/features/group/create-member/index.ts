import { supabase } from '@/shared/lib';

export const createMember = async ({
  user_id,
  group_id,
}: {
  user_id?: string;
  group_id?: string;
}) => {
  if (!(user_id && group_id)) return;
  const { data, error } = await supabase
    .from('group_members')
    .insert({ user_id, group_id })
    .select();

  if (error) {
    throw error;
  }

  return data[0];
};
