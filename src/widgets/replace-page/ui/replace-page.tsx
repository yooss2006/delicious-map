import { Flex } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

import { useGroupList } from '@/entities/group/api/group-list';
import { useCurrentUser } from '@/entities/user';

export function ReplacePage() {
  const { data: user } = useCurrentUser();
  const { data: groups, isLoading } = useGroupList({ userId: user?.id });

  if (isLoading)
    return (
      <Flex w="400px" h="100%">
        로딩중
      </Flex>
    );

  if (!groups || (groups && groups.length === 0)) {
    return <Navigate to="/create-group" replace={true} />;
  }

  return <Navigate to={`/group/${groups[0]?.id}`} replace={true} />;
}
