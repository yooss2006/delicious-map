import { StarIcon } from '@chakra-ui/icons';
import { IconButton, Link as ChakraLink } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';

import { MerchantCardType } from '@/entities/merchant-card';

export function CreateBookmarkLink(props: MerchantCardType) {
  const { id } = useParams();
  return (
    <ChakraLink as={Link} to={`/group/${id}/create-bookmark`} state={props}>
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
    </ChakraLink>
  );
}
