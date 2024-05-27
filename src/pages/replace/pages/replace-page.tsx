import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';

import { groupQueries } from '@/entities/group';
import { profileQueries } from '@/entities/profile';
import { pathKeys } from '@/shared/lib/react-router';
import { LoadingPage } from '@/shared/ui/layout';

export function ReplacePage() {
  const profile = profileQueries.profileService.getCache();
  const { data: groupList, isLoading } = useQuery(
    groupQueries.GroupListService.queryOptions(profile?.id)
  );

  if (isLoading) return <LoadingPage />;

  if (!groupList || (groupList && groupList.length === 0)) {
    return <Navigate to={pathKeys.group.create()} replace={true} state={{ isNoGroup: true }} />;
  }

  return <Navigate to={pathKeys.group.detail(groupList[0]?.id ?? '')} replace={true} />;
}
