export const queryKey = {
  currentUser: ['current_user'],
  groupList: ['group_list'],
  groupDetail: (groupId?: string) => ['group', groupId],
  bookmarkListByGroupId: (groupId?: string) => ['bookmark', 'group', groupId],
};
