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
      paddingY={2}
      flexBasis="80px"
      flexDirection="column"
      alignItems="center"
      gap={4}
      background="white"
      borderRight="1px"
      borderColor="gray.200"
    >
      <IconButton
        w={14}
        h={14}
        colorScheme="blue"
        aria-label="그룹 추가"
        icon={<AddIcon />}
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
