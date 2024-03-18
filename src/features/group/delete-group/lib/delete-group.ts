import { supabase } from '@/shared/lib';

export const deleteGroup = async (group_id: string | undefined) => {
  if (!group_id) return;
  const { error: groupMemberError } = await supabase
    .from('group_members')
    .delete()
    .eq('group_id', group_id);
  if (groupMemberError) throw groupMemberError;
  const { error: groupError } = await supabase.from('groups').delete().eq('id', group_id);
  if (groupError) throw groupError;
};
