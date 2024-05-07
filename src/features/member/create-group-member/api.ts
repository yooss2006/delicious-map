import { supabase } from '@/shared/lib';

export const createGroupMember = async ({
  profileId,
  name,
  groupId,
  image,
}: {
  profileId?: number;
  groupId?: string;
  name?: string;
  image?: string;
}) => {
  if (!(profileId && groupId)) return;
  const { data, error } = await supabase
    .from('group_member')
    .insert({ profile_id: profileId, group_id: groupId, image: image ?? '', name })
    .select();

  if (error) {
    throw error;
  }

  return data[0];
};
