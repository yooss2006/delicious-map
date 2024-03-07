import { Text, Card, CardBody, Heading, Box, useColorModeValue } from '@chakra-ui/react';
import { PiBowlFoodDuotone, PiCoffeeDuotone } from 'react-icons/pi';

import CreateMerchantButton from '@/old-file/components/CreateMerchantButton';
import { useKakaoMap } from '@/old-file/lib/kakao-map';
import { MerchantCardType } from '@/old-file/types/place';

export default function MerchantCard(props: MerchantCardType) {
  const cardColor = useColorModeValue('gray.100', 'gray.900');
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
      _hover={{ background: cardColor }}
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
        <CreateMerchantButton {...props} />
      </CardBody>
    </Card>
  );
}
