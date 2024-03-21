import { Flex } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

import { useGroupList } from '@/features/group/get-group-list';

export function ReplacePage() {
  const { groups, isLoading } = useGroupList();

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
