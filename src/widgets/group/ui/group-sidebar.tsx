import { AddIcon } from '@chakra-ui/icons';
import { CircularProgress, Flex, IconButton } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';

import { useGroupList } from '@/pages/group-detail/hooks/useGroupList';
import { ModalEnum, useModal } from '@/shared/lib/modal';

import { GroupLinkList } from './group-link-list';

export function GroupSidebar() {
  const { openModal } = useModal();

  const { groups, isLoading } = useGroupList();

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
