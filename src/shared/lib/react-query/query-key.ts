export const queryKey = {
  currentUser: ['current_user'],
  groupList: ['group_list'],
  groupDetail: (groupId?: string) => ['group', groupId],
  groupMemberListByGroupId: (groupId?: string) => ['group_member', 'group', groupId],
  groupMemberListByUserId: (userId?: string) => ['group_member', 'user', userId],
  invitationByGroupId: (groupId?: string) => ['invitation', 'group', groupId],
  invitationByLink: (link?: string) => ['invitation', 'link', link],
};
