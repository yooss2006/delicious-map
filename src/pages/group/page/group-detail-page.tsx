import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGroupDetail } from '@/entities/group';
import { useParsedLocation } from '@/shared/hooks';

import { BookmarkContent } from '../ui/bookmark-content';
import { MainContent } from '../ui/main-content';
import { MenuSidebar } from '../ui/menu-sidebar';
import { SearchContent } from '../ui/search-content';

const useGroupData = () => {
  const navigate = useNavigate();
  const { data: group, isLoading } = useGroupDetail();

  useEffect(() => {
    if (!group && !isLoading) {
      navigate('/group/create');
    }
  }, [group, navigate, isLoading]);
};

export function GroupDetailPage() {
  const { query } = useParsedLocation();
  const mode = query.mode || '';

  useGroupData();

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
              return <SearchContent />;
            case 'bookmark':
              return <BookmarkContent />;
            default:
              return <MainContent />;
          }
        })()}
      </Flex>
    </Flex>
  );
}
