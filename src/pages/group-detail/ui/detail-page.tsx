import { Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getGroupByGroupId } from '@/features/group/get-group-by-group-id';
import { useParsedLocation } from '@/shared/hooks';
import { MainBox, SearchBox } from '@/widgets/group-detail/ui';
import { MenuList } from '@/widgets/menu/ui/menu-list';

export function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useQuery({ queryKey: ['group', id], queryFn: getGroupByGroupId });

  const { query } = useParsedLocation();

  const mode = query.mode || '';

  useEffect(() => {
    if (data && data.length === 0) {
      navigate('/create-group');
    }
  }, [data, navigate]);

  return (
    <Flex w="440px" h="100%">
      <MenuList />
      <Flex
        flex={1}
        h="100%"
        flexDirection="column"
        alignItems="center"
        gap={4}
        background="white"
        color="black"
        borderRight="1px"
        borderColor="gray.200"
      >
        {(() => {
          switch (mode) {
            case 'search':
              return <SearchBox />;
            default:
              return <MainBox />;
          }
        })()}
      </Flex>
    </Flex>
  );
}
