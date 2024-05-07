import { Flex } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

import { useGroupListByProfileId } from '@/entities/group/api/group-list';
import { useProfile } from '@/entities/profile';

export function ReplacePage() {
  const { data: profile } = useProfile();
  const { data: groups, isLoading } = useGroupListByProfileId({ profileId: profile?.id });

  if (isLoading)
    return (
      <Flex w="400px" h="100%">
        로딩중
      </Flex>
    );

  if (!groups || (groups && groups.length === 0)) {
    return <Navigate to="/group/create" replace={true} />;
  }

  return <Navigate to={`/group/${groups[0]?.id}`} replace={true} />;
}
