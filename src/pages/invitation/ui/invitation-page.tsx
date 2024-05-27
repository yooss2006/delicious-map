import {
  Box,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { useGroupMemberListByProfileId } from '@/entities/group-member';
import { profileQueries } from '@/entities/profile';
import { LoadingPage } from '@/shared/ui/layout';
import {
  ExistingUserModalContent,
  InvitationModalContent,
} from '@/widgets/invitation-modal-content';

export function InvitationPage() {
  const profile = profileQueries.profileService.getCache();
  const { data: member, isLoading: isMemberLoading } = useGroupMemberListByProfileId(profile?.id);
  const isCurrentUserMember = member?.length;

  if (isMemberLoading) return <LoadingPage />;

  return (
    <Box w="100%" h="100%">
      <Modal isOpen={true} onClose={() => {}} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading as="h1" fontSize="22px" textAlign="center">
              그룹 초대장
            </Heading>
          </ModalHeader>
          <ModalBody>
            {isCurrentUserMember ? <ExistingUserModalContent /> : <InvitationModalContent />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
