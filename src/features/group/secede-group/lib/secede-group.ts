import { supabase } from '@/shared/lib';

type Props = {
  userId: string;
  groupId: string;
};

export const secedeGroup = async ({ userId, groupId }: Props) => {
  const { error: groupMemberError } = await supabase
    .from('group_member')
    .delete()
    .eq('user_id', userId);
  if (groupMemberError) throw groupMemberError;

  const { data: groupMembers, error: getGroupMembersError } = await supabase
    .from('group_member')
    .select('*')
    .eq('group_id', groupId);
  if (groupMemberError) throw getGroupMembersError;

  if (groupMembers?.length === 0) {
    const { error: groupError } = await supabase.from('group').delete().eq('id', groupId);
    if (groupError) throw groupError;
  }
};
