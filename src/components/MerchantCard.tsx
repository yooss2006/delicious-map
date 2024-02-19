import { StarIcon } from '@chakra-ui/icons';
import { Text, Card, CardBody, Heading, Box, Button } from '@chakra-ui/react';
import { PiBowlFoodDuotone, PiCoffeeDuotone } from 'react-icons/pi';

import { useKakaoMap } from '@/lib/kakao-map';
import { useModal } from '@/providers/useModal';

type Props = {
  lat: number;
  lng: number;
  name: string;
  address: string;
  code: string;
};

export default function MerchantCard(props: Props) {
  const { lat, lng, name, address, code } = props;
  const { openModal } = useModal();
  const { move } = useKakaoMap();
  const Icon = code === 'CE7' ? PiCoffeeDuotone : PiBowlFoodDuotone;
  const handleButtonClick = () => {
    move({ center: { lat, lng }, level: 1 });
  };
  const handleAddButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    openModal({ type: 'merchant', data: { lat, lng, name, address } });
  };
  return (
    <Card
      onClick={handleButtonClick}
      variant="outline"
      transition=".3s"
      _hover={{ background: 'gray.100' }}
    >
      <CardBody position="relative">
        <Box as="article" display="flex" alignItems="center" gap="2">
          <Icon />
          <Heading fontSize="md" fontWeight={900}>
            {name}
          </Heading>
        </Box>
        <Text fontSize="sm" color="gray.500">
          {address}
        </Text>
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
      </CardBody>
    </Card>
  );
}
