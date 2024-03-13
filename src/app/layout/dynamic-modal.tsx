import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';

import { GroupModalContent } from '@/entities/group';
import { ModalEnum, useModal } from '@/shared/lib/modal/modal';

export function DynamicModal() {
  const {
    modalState: { isOpen, type, data },
    closeModal,
  } = useModal();

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        {(() => {
          switch (type) {
            case ModalEnum.Group:
              return <GroupModalContent data={data} />;
            default:
              return null;
          }
        })()}
      </ModalContent>
    </Modal>
  );
}
