import { AddIcon } from '@chakra-ui/icons';
import { CircularProgress, Divider, Flex, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useGroupList } from '@/entities/group/api/group-list';
import { useCurrentUser } from '@/entities/user';

import { GroupLinkList } from './group-link-list';
import { UserPopoverButton } from './user-popover-button';

export function Sidebar() {
  const { data: user } = useCurrentUser();
  const navigate = useNavigate();

  const { data: groups, isLoading } = useGroupList({ userId: user?.id });

  const moveCreateGroupPage = () => navigate('/create-group');

  return (
    <Flex
      py={2}
      w="80px"
      flexDirection="column"
      alignItems="center"
      gap={4}
      textAlign="center"
      background="gray.200"
      borderRight="1px"
      borderColor="gray.400"
      _dark={{ background: 'gray.800', borderColor: 'gray.600' }}
    >
      <UserPopoverButton />
      <Divider w="80%" marginInline="auto" />
      <IconButton
        w={14}
        h={14}
        background="green.50"
        _hover={{ background: 'green.100' }}
        _dark={{ background: 'gray.500' }}
        aria-label="그룹 추가"
        icon={<AddIcon color="green.600" _dark={{ color: 'gray.800' }} />}
        onClick={moveCreateGroupPage}
      />
      {isLoading ? (
        <CircularProgress isIndeterminate color="green.300" />
      ) : (
        <GroupLinkList groups={groups} />
      )}
    </Flex>
  );
}
