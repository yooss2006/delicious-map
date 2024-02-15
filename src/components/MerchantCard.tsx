import { Text, Card, CardBody, Heading, Box } from '@chakra-ui/react';
import { PiBowlFoodDuotone, PiCoffeeDuotone } from 'react-icons/pi';

import { useKakaoMap } from '@/lib/kakao-map';

type Props = {
  lat: number;
  lng: number;
  name: string;
  address: string;
  code: string;
};

export default function MerchantCard(props: Props) {
  const { lat, lng, name, address, code } = props;
  const { move } = useKakaoMap();
  const Icon = code === 'CE7' ? PiCoffeeDuotone : PiBowlFoodDuotone;
  const handleButtonClick = () => {
    move({ center: { lat, lng }, level: 1 });
  };
  return (
    <Card
      onClick={handleButtonClick}
      variant="outline"
      transition=".3s"
      _hover={{ background: 'gray.100' }}
    >
      <CardBody>
        <Box as="article" display="flex" alignItems="center" gap="2">
          <Icon />
          <Heading fontSize="lg" fontWeight={900}>
            {name}
          </Heading>
        </Box>
        <Text fontSize="sm" color="gray.500">
          {address}
        </Text>
      </CardBody>
    </Card>
  );
}
