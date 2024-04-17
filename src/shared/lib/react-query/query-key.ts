export const queryKey = {
  currentUser: ['current_user'],
  groupList: ['group_list'],
  groupDetail: (groupId?: string) => ['group', groupId],
  groupMemberList: (groupId?: string) => ['group_member_list', groupId],
  invitationByGroup: (groupId?: string) => ['invitation', 'group', groupId],
};
