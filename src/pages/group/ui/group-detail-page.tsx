import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGroupDetail } from '@/entities/group/api/get-group-by-group-id';
import { useParsedLocation } from '@/shared/hooks';
import { MainBox } from '@/widgets/group-detail-main';
import { SearchBox } from '@/widgets/group-detail-search';
import { MenuSidebar } from '@/widgets/menu';

export function GroupDetailPage() {
  const navigate = useNavigate();
  const { data: group, isLoading } = useGroupDetail();

  const { query } = useParsedLocation();

  const mode = query.mode || '';

  useEffect(() => {
    if (!group && !isLoading) {
      navigate('/group/create');
    }
  }, [group, navigate, isLoading]);

  return (
    <Flex w="440px" h="100%">
      <MenuSidebar />
      <Flex
        flex={1}
        h="100%"
        flexDirection="column"
        alignItems="center"
        gap={4}
        background="gray.50"
        color="black"
        borderRight="1px"
        borderColor="gray.200"
        _dark={{ background: 'gray.500' }}
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
