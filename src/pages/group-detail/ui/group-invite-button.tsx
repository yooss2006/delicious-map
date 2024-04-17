import { EmailIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { useLatestInvitationByGroupId } from '@/entities/invitation';
import { useCreateInvitation } from '@/features/invitation/create-invitation';
import { CopyableInput } from '@/shared/ui/input';

export function GroupInviteModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button leftIcon={<EmailIcon />} onClick={onOpen}>
        초대하기
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <GroupInviteModalContent />
      </Modal>
    </>
  );
}

export function GroupInviteModalContent() {
  const { id } = useParams();
  const { data: invitation, isLoading } = useLatestInvitationByGroupId();
  const { mutate, isPending } = useCreateInvitation();

  const handleCreateInvitation = () => {
    if (!id) return;
    mutate({ groupId: id });
  };

  const isCreateInvitation = (date?: string) => {
    if (!date) return false;
    const givenDate = new Date(date).getTime();
    const oneDayLater = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime();

    return givenDate >= oneDayLater;
  };

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
          {isLoading ? (
            <Flex flex={1} alignItems="center" gap={4}>
              <Spinner /> 링크를 불러오는 중입니다.
            </Flex>
          ) : (
            <CopyableInput
              leftText={`${import.meta.env.VITE_BASE_URL}/invitation/`}
              isDisabled
              value={invitation?.link}
            />
          )}
          <Button
            px={8}
            leftIcon={<EmailIcon />}
            onClick={handleCreateInvitation}
            isLoading={isPending || isLoading}
            isDisabled={!isCreateInvitation(invitation?.created_at)}
          >
            초대 링크 생성
          </Button>
        </Flex>
      </ModalBody>
    </ModalContent>
  );
}
