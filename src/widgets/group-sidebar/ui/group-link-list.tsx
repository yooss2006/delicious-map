import { Flex, Image, Link as ChakraLink, Box, chakra } from '@chakra-ui/react';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';

import { useParsedLocation } from '@/shared/hooks';
import { Database } from '@/shared/lib/supabase/type';
import { scrollNoneStyles } from '@/shared/style';

type Props = {
  groups?: Array<Database['public']['Tables']['groups']['Row']>;
};

const RegUserCircle = chakra(FaRegUserCircle);

export function GroupLinkList({ groups = [] }: Props) {
  const { pathname } = useParsedLocation();
  const { id } = useParams();

  return (
    <Box w="100%" maxH="100%" sx={scrollNoneStyles}>
      <Flex py={1} justifyContent="center" flexDirection="column" gap={4} alignItems="center">
        {groups?.map(({ id: groupId, name, image_url }) => {
          const nextPathname = `/group/${groupId}`;
          const isCurrentGroup = id === groupId;

          const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (pathname === nextPathname) {
              e.preventDefault();
            }
          };

          return (
            <ChakraLink
              as={ReactRouterLink}
              to={nextPathname}
              key={groupId}
              w={14}
              h={14}
              p={0}
              onClick={handleLinkClick}
              borderRadius="md"
              boxSizing="border-box"
              display="flex"
              justifyContent="center"
              alignItems="center"
              boxShadow={isCurrentGroup ? `0 0 0 3px var(--chakra-colors-green-400)` : 'none'}
              _hover={
                !isCurrentGroup ? { boxShadow: '0 0 0 3px var(--chakra-colors-green-50)' } : {}
              }
              _dark={{
                boxShadow: isCurrentGroup ? `0 0 0 3px var(--chakra-colors-gray-500)` : 'none',
                _hover: !isCurrentGroup
                  ? { boxShadow: '0 0 0 3px var(--chakra-colors-gray-400)' }
                  : {},
              }}
            >
              <Image
                src={image_url ?? ''}
                alt={name}
                w="100%"
                h="100%"
                objectFit="cover"
                fallback={<RegUserCircle fontSize="32px" color="green" _dark={{ color: 'gray' }} />}
                borderRadius="md"
              />
            </ChakraLink>
          );
        })}
      </Flex>
    </Box>
  );
}
