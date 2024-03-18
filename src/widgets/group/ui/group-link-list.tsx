import { Flex, Image, Link as ChakraLink } from '@chakra-ui/react';
import { AiOutlineLoading } from 'react-icons/ai';
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
            boxShadow={pathname === nextPathname ? '0 0 0 3px #4931ce' : 'none'}
            _hover={pathname !== nextPathname ? { boxShadow: '0 0 0 3px #3182ce' } : {}}
          >
            <Image
              src={image_url ? image_url : undefined}
              alt={name}
              w="100%"
              h="100%"
              objectFit="cover"
              fallback={<AiOutlineLoading />}
              borderRadius="md"
            />
          </ChakraLink>
        );
      })}
    </Flex>
  );
}
