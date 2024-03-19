import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';

import { ModalEnum, useModal } from '@/shared/lib/modal/modal';
import { CreateRecordModalContent } from '@/widgets/create-record-modal-content';
import { GroupModalContent } from '@/widgets/group/ui/group-modal-content';

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
            case ModalEnum.Record:
              return <CreateRecordModalContent data={data} />;
            default:
              return null;
          }
        })()}
      </ModalContent>
    </Modal>
  );
}
