import { Box, Card, CardBody, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { PiBowlFoodDuotone, PiCoffeeDuotone } from 'react-icons/pi';

import { useKakaoMap } from '@/entities/kakao-map';
import { MerchantCardType } from '@/entities/merchant-card';

import { CreateBookmarkLink } from './create-bookmark-link';

export function MerchantCard(props: MerchantCardType) {
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
          <Heading w="60%" wordBreak="keep-all" fontSize="md" fontWeight={900}>
            {name}
          </Heading>
        </Box>
        <Text w="70%" wordBreak="keep-all" fontSize="sm" color="gray.500">
          {address}
        </Text>
        <CreateBookmarkLink {...props} />
      </CardBody>
    </Card>
  );
}
