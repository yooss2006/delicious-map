const keys = {
  root: () => ['group'],
  groupList: () => [...keys.root(), 'list'],
  groupDetail: (groupId?: string) => ['group', groupId],
};
