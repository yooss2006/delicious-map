import { useQuery } from '@tanstack/react-query';

import { useCurrentUser } from '@/entities/user';
import { getGroupsByMyId } from '@/features/group/get-group-list/get-groups-by-id';

export const useGroupList = () => {
  const { data: user, isLoading: isUserLoading } = useCurrentUser();

  const { data: groups, isLoading: isGroupsLoading } = useQuery({
    queryKey: ['group_list', user?.id],
    queryFn: getGroupsByMyId,
    refetchOnWindowFocus: false,
    enabled: !!user,
  });

  const isLoading = isGroupsLoading || isUserLoading;

  return { user, groups, isLoading };
};
