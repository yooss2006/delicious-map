import { AddIcon } from '@chakra-ui/icons';
import { CircularProgress, Flex, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useGroupList } from '@/features/group/get-group-list/use-group-list';

import { GroupLinkList } from './group-link-list';

export function GroupSidebar() {
  const navigate = useNavigate();

  const { groups, isLoading } = useGroupList();

  const moveCreateGroupPage = () => navigate('/create-group');

  return (
    <Flex
      py={2}
      w="80px"
      flexDirection="column"
      alignItems="center"
      gap={4}
      textAlign="center"
      background="gray.50"
      borderRight="1px"
      borderColor="gray.200"
    >
      <IconButton
        w={14}
        h={14}
        background="green.50"
        _hover={{ background: 'green.100' }}
        aria-label="그룹 추가"
        icon={<AddIcon color="green.600" />}
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
