import { StarIcon } from '@chakra-ui/icons';
import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import { PiBowlFoodDuotone, PiCoffeeDuotone } from 'react-icons/pi';
import { useParams } from 'react-router-dom';

import { useKakaoMap } from '@/entities/kakao-map';
import { Merchant } from '@/entities/merchant';
import { pathKeys } from '@/shared/lib/react-router';
import { Link } from '@/shared/ui/link';

export function MerchantCard(props: Merchant) {
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

function CreateBookmarkLink(props: Merchant) {
  const { id } = useParams();
  return (
    <Link to={pathKeys.bookmark.create()} state={{ ...props, groupId: id }}>
      <IconButton
        size="sm"
        aria-label={`${props.name} 북마크 저장`}
        position="absolute"
        top="50%"
        bottom="50%"
        right={4}
        transform="translateY(-50%)"
        background="green.700"
        color="white"
        _hover={{ background: 'green.900' }}
        icon={<StarIcon />}
      />
    </Link>
  );
}
