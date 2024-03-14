import { AddIcon } from '@chakra-ui/icons';
import { Flex, IconButton } from '@chakra-ui/react';

import { ModalEnum, useModal } from '@/shared/lib/modal';

import { GroupButtonList } from './group-button-list';

export function GroupSidebar() {
  const { openModal } = useModal();

  const openGroupModal = () => {
    openModal({ type: ModalEnum.Group, data: null });
  };

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
      <GroupButtonList />
    </Flex>
  );
}
