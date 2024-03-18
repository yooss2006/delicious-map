import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/features/auth/user';
import { getGroupsByMyId } from '@/features/group/get-group-list';

export const useGroupList = () => {
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['current_user'],
    queryFn: getUser,
    refetchOnWindowFocus: false,
  });

  const { data: groups, isLoading: isGroupsLoading } = useQuery({
    queryKey: ['group_list', user?.id],
    queryFn: getGroupsByMyId,
    refetchOnWindowFocus: false,
    enabled: !!user,
  });

  const isLoading = isGroupsLoading || isUserLoading;

  return { user, groups, isLoading };
};
