import { StarIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import React from 'react';

import { useModal } from '@/old-file/providers/useModal';
import { MerchantCardType } from '@/old-file/types/place';

export default function CreateMerchantButton(props: MerchantCardType) {
  const { lat, lng, name, address, merchantId, code } = props;
  const { openModal } = useModal();
  const handleAddButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    openModal({ type: 'merchant', data: { lat, lng, name, address, merchantId, code } });
  };
  return (
    <Button
      leftIcon={<StarIcon />}
      size="sm"
      onClick={handleAddButtonClick}
      colorScheme="blue"
      position="absolute"
      top="50%"
      bottom="50%"
      right={2}
      transform="translateY(-50%)"
    >
      추가
    </Button>
  );
}
