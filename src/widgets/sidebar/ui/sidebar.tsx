import { AddIcon } from '@chakra-ui/icons';
import { Divider, Flex, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useGroupListByProfileId } from '@/entities/group/api/group-list';
import { useProfile } from '@/entities/profile';
import { LoadingCircle } from '@/shared/ui/loading';

import { GroupLinkList } from './group-link-list';
import { UserPopoverButton } from './user-popover-button';

export function Sidebar() {
  const { data: profile } = useProfile();
  const navigate = useNavigate();

  const { data: groups, isLoading } = useGroupListByProfileId({ profileId: profile?.id });

  const moveCreateGroupPage = () => navigate('/group/create');

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
      {isLoading ? <LoadingCircle /> : <GroupLinkList groups={groups} />}
    </Flex>
  );
}
