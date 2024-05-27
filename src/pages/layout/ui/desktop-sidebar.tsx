import { AddIcon } from '@chakra-ui/icons';
import { Box, Divider, IconButton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { groupQueries } from '@/entities/group';
import { profileQueries } from '@/entities/profile';
import { pathKeys } from '@/shared/lib/react-router';
import { LoadingCircle } from '@/shared/ui/loading';

import { GroupLinkList } from './group-link-list';
import { UserPopoverButton } from './user-popover-button';

export function DesktopSidebar() {
  const navigate = useNavigate();

  const profile = profileQueries.profileService.getCache();
  const { data: groupList, isLoading } = useQuery(
    groupQueries.GroupListService.queryOptions(profile?.id)
  );

  return (
    <Box
      py={2}
      w="80px"
      display="flex"
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
        background="green.100"
        transition="all .3s"
        _hover={{ background: 'green.200', boxShadow: 'md' }}
        _dark={{ background: 'gray.500' }}
        aria-label="그룹 추가"
        icon={<AddIcon color="green.600" _dark={{ color: 'gray.800' }} />}
        onClick={() => navigate(pathKeys.group.create())}
      />
      {isLoading ? <LoadingCircle /> : <GroupLinkList groups={groupList} />}
    </Box>
  );
}
