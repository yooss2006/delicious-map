import { Heading } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import { MerchantCardType } from '@/entities/merchant-card';

import { MenuToggleContainer } from './menu-toggle-container';

export function CreateMerchantPage() {
  const location = useLocation();
  const merchant: MerchantCardType | null = location.state;

  if (!merchant) return null;

  return (
    <MenuToggleContainer>
      <Heading py={4} lineHeight={2} as="h2" fontSize="lg" textAlign="center">
        {`${merchant.code === 'FD6' ? '음식점' : '카페'}`} 글쓰기
      </Heading>
    </MenuToggleContainer>
  );
}
