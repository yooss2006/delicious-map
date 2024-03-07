import { useModal } from '@/old-file/providers/useModal';

import MerchantModal from './MerchantModal';

export default function DynamicModal() {
  const {
    modalState: { merchant },
  } = useModal();

  switch (true) {
    case merchant.isOpen:
      return <MerchantModal />;
    default:
      return null;
  }
}
