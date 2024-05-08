export const queryKey = {
  currentUser: ['current_user'],
  groupDetail: (groupId?: string) => ['group', groupId],
};
