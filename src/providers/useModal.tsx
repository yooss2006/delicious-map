import React from 'react';

import DynamicModal from '@/components/Modal';

type Props = {
  children: React.ReactNode;
};

type ModalType = 'merchant';

interface ModalStateType {
  isOpen: boolean;
  type: ModalType;
  data: Record<string, any> | null;
}

type OpenModal = (data: Omit<ModalStateType, 'isOpen'>) => void;
type CloseModal = () => void;

const DEFAULT_MODAL_STATE: Record<ModalType, ModalStateType> = {
  merchant: {
    isOpen: false,
    type: 'merchant',
    data: null,
  },
};

const ModalContext = React.createContext<
  Record<'modalState', Record<ModalType, ModalStateType>> & {
    openModal: OpenModal;
    closeModal: CloseModal;
  }
>({ modalState: DEFAULT_MODAL_STATE, openModal: () => {}, closeModal: () => {} });

export function ModalProvider({ children }: Props) {
  const [state, setState] = React.useState(DEFAULT_MODAL_STATE);

  const openModal: OpenModal = ({ type, data }: Omit<ModalStateType, 'isOpen'>) => {
    setState((prev) => ({ ...prev, [type]: { isOpen: true, type, data } }));
  };
  const closeModal = () => {
    setState(DEFAULT_MODAL_STATE);
  };

  const value = React.useMemo(() => ({ modalState: state, openModal, closeModal }), [state]);

  return (
    <ModalContext.Provider value={value}>
      <>
        {children}
        <DynamicModal />
      </>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
