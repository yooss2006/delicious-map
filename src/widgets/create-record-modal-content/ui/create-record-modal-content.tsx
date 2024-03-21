import {
  Button,
  Flex,
  Heading,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Text,
} from '@chakra-ui/react';

// import { Menu, Merchant } from '@/entities/merchant';
import { MerchantCardType } from '@/entities/merchant-card';
import { useModal } from '@/shared/lib/modal';

import { MenuForm } from './menu-form';
import { MerchantForm } from './merchant-form';

type Props = {
  data: MerchantCardType;
};

// type FormValues = Pick<Merchant, 'photo' | 'rating' | 'review' | 'visit_date'> & {
//   menu: Array<Omit<Menu, 'id' | 'merchant_id'>>;
// };

export function CreateRecordModalContent({ data }: Props) {
  const { name, address, lat, lng, merchantId, code } = data || {};
  console.log(name, address, lat, lng, merchantId, code);

  const { closeModal } = useModal();

  return (
    <>
      <ModalHeader>
        <Heading as="h2" fontSize="lg" textAlign="center">
          {name}
        </Heading>
        <Text fontSize="small" color="gray.500" textAlign="center">
          {address}
        </Text>
      </ModalHeader>
      <ModalCloseButton />
      <Flex justifyContent="space-between" alignItems="center">
        <MerchantForm code={code} />
        <MenuForm />
      </Flex>
      <ModalFooter>
        <Flex gap={3}>
          <Button type="submit" colorScheme="blue">
            추가
          </Button>
          <Button colorScheme="red" onClick={closeModal}>
            닫기
          </Button>
        </Flex>
      </ModalFooter>
    </>
  );
}
