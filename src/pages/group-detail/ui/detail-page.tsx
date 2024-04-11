import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGroupDetail } from '@/entities/group/api';
import { useParsedLocation } from '@/shared/hooks';
import { MainBox, MenuSidebar, SearchBox } from '@/widgets/group-detail/ui';

export function DetailPage() {
  const navigate = useNavigate();
  const { data } = useGroupDetail();

  const { query } = useParsedLocation();

  const mode = query.mode || '';

  useEffect(() => {
    if (data && data.length === 0) {
      navigate('/create-group');
    }
  }, [data, navigate]);

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
