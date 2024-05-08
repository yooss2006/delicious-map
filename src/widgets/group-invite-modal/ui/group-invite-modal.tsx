import { EmailIcon } from '@chakra-ui/icons';
import {
  Button,
  Modal,
  ModalOverlay,
  useDisclosure,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text,
} from '@chakra-ui/react';

import { CreateInviteButton } from '@/features/invitation/create-invitation';
import { GroupInviteLinkInput } from '@/features/invitation/load-invitation';

export function GroupInviteModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        leftIcon={<EmailIcon />}
        onClick={onOpen}
        position="absolute"
        right={3}
        top="50%"
        transform="translateY(-50%)"
      >
        초대하기
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <GroupInviteModalContent />
      </Modal>
    </>
  );
}
function GroupInviteModalContent() {
  return (
    <ModalContent w="1300px">
      <ModalHeader>그룹 초대 링크</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text mb={1}>
          초대 링크는 24시간 유지됩니다. 링크가 만료되어야 초대 링크 생성이 가능합니다.
        </Text>
        <Text mb={2}>링크를 복사해 친구에게 전달하면, 그룹에 초대할 수 있습니다.</Text>
        <Flex mb={2} gap={2} alignItems="center" justifyContent="space-between">
          <GroupInviteLinkInput />
          <CreateInviteButton />
        </Flex>
      </ModalBody>
    </ModalContent>
  );
}
