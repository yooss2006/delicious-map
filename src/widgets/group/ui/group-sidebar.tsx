import { AddIcon } from '@chakra-ui/icons';
import { CircularProgress, Flex, IconButton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

import { getUser } from '@/features/auth/user';
import { getGroupsByMyId } from '@/features/group/get-group-list';
import { ModalEnum, useModal } from '@/shared/lib/modal';

import { GroupLinkList } from './group-link-list';

export function GroupSidebar() {
  const { openModal } = useModal();

  const { data: user } = useQuery({
    queryKey: ['current_user'],
    queryFn: getUser,
    refetchOnWindowFocus: false,
  });

  const { data: groups, isLoading } = useQuery({
    queryKey: ['group_list', user?.id],
    queryFn: getGroupsByMyId,
    refetchOnWindowFocus: false,
    enabled: !!user,
  });

  const openGroupModal = useCallback(() => {
    openModal({ type: ModalEnum.Group, data: null });
  }, [openModal]);

  useEffect(() => {
    if (groups && groups.length === 0) {
      openGroupModal();
    }
  }, [groups, openGroupModal]);

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
        onClick={openGroupModal}
      />
      {isLoading ? (
        <CircularProgress isIndeterminate color="green.300" />
      ) : (
        <GroupLinkList groups={groups} />
      )}
    </Flex>
  );
}
