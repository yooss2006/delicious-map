import { Flex, Image, Link as ChakraLink } from '@chakra-ui/react';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link as ReactRouterLink } from 'react-router-dom';

import { useParsedLocation } from '@/shared/hooks';
import { Database } from '@/shared/lib/supabase/type';

type Props = {
  groups?: Array<Database['public']['Tables']['groups']['Row']>;
};

export function GroupLinkList({ groups = [] }: Props) {
  const { pathname } = useParsedLocation();
  return (
    <Flex flexDirection="column" gap={4} alignItems="center">
      {groups?.map(({ id, name, image_url }) => {
        const nextPathname = `/group/${id}`;

        const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
          if (pathname === nextPathname) {
            e.preventDefault();
          }
        };

        return (
          <ChakraLink
            as={ReactRouterLink}
            to={nextPathname}
            key={id}
            w={14}
            h={14}
            p={0}
            onClick={handleLinkClick}
            borderRadius="md"
            boxSizing="content-box"
            display="flex"
            justifyContent="center"
            alignItems="center"
            boxShadow={
              pathname === nextPathname ? `0 0 0 3px var(--chakra-colors-green-200)` : 'none'
            }
            _hover={pathname !== nextPathname ? { boxShadow: '0 0 0 3px #3182ce' } : {}}
          >
            <Image
              src={image_url ?? ''}
              alt={name}
              w="100%"
              h="100%"
              objectFit="cover"
              fallback={<FaRegUserCircle fontSize="32px" color="green" />}
              borderRadius="md"
            />
          </ChakraLink>
        );
      })}
    </Flex>
  );
}
