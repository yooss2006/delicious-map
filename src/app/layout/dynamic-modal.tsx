import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';

import { ModalEnum, useModal } from '@/shared/lib/modal/modal';
import { CreateRecordModalContent } from '@/widgets/create-record-modal-content';

export function DynamicModal() {
  const {
    modalState: { isOpen, type, data },
    closeModal,
  } = useModal();

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent maxWidth="800px">
        {(() => {
          switch (type) {
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
