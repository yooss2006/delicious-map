import React, { useCallback } from 'react';

type Props = {
  children: React.ReactNode;
};

export enum ModalEnum {
  Group = 'group',
}

interface ModalStateType {
  isOpen: boolean;
  type: ModalEnum | null;
  data: Record<string, any> | null;
}

type OpenModal = (data: Omit<ModalStateType, 'isOpen'>) => void;
type CloseModal = () => void;

const DEFAULT_MODAL_STATE: ModalStateType = {
  isOpen: false,
  type: null,
  data: null,
};

const ModalContext = React.createContext<{
  modalState: ModalStateType;
  openModal: OpenModal;
  closeModal: CloseModal;
}>({ modalState: DEFAULT_MODAL_STATE, openModal: () => {}, closeModal: () => {} });

export function ModalProvider({ children }: Props) {
  const [state, setState] = React.useState(DEFAULT_MODAL_STATE);

  const openModal: OpenModal = useCallback(
    ({ type, data }: Omit<ModalStateType, 'isOpen'>) => {
      if (!state.isOpen) setState({ isOpen: true, type, data });
    },
    [state.isOpen]
  );

  const closeModal = () => {
    setState(DEFAULT_MODAL_STATE);
  };

  const value = React.useMemo(
    () => ({ modalState: state, openModal, closeModal }),
    [openModal, state]
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useModal() {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
