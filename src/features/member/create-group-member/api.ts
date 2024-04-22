import { supabase } from '@/shared/lib';

export const createGroupMember = async ({
  userId,
  name,
  groupId,
  userImageUrl,
}: {
  userId?: string;
  groupId?: string;
  name?: string;
  userImageUrl?: string;
}) => {
  if (!(userId && groupId)) return;
  const { data, error } = await supabase
    .from('group_members')
    .insert({ user_id: userId, group_id: groupId, image_url: userImageUrl ?? '', name })
    .select();

  if (error) {
    throw error;
  }

  return data[0];
};
