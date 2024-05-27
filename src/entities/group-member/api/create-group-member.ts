import { supabase } from '@/shared/lib';

import { GroupMemberDto } from '../types';

export const createGroupMember = async ({ profileId, groupId, ...rest }: GroupMemberDto) => {
  if (!(profileId && groupId)) return;

  const { data, error } = await supabase
    .from('group_member')
    .insert({ profile_id: profileId, group_id: groupId, ...rest })
    .select();

  if (error) {
    throw error;
  }

  return data[0];
};
