import { Flex, List, ListItem } from '@chakra-ui/react';

import { useSearchPlaces } from '@/features/kakao-places/search-places';
import { useParsedLocation } from '@/shared/hooks';
import { scrollNoneStyles } from '@/shared/style';
import { QueryStringSearch } from '@/shared/ui/search';

import { MerchantCard } from './merchant-card';

export function SearchBox() {
  const { query } = useParsedLocation();
  const q = query.q;
  return (
    <Flex w="100%" h="100%" mt={2} px={4} flexDirection="column">
      <QueryStringSearch placeholder="음식점 또는 카페를 검색하세요." />
      {q && <SearchResultList q={q} />}
    </Flex>
  );
}

export function SearchResultList({ q }: { q: string }) {
  const places = useSearchPlaces();
  console.log(q);

  return (
    <List
      mt={4}
      mb={8}
      maxH="90%"
      display="flex"
      flexDirection="column"
      gap={2}
      sx={scrollNoneStyles}
    >
      {places.map((places) => {
        return (
          <ListItem key={places.id}>
            <MerchantCard
              merchantId={places.id}
              lat={Number(places.y)}
              lng={Number(places.x)}
              name={places.place_name}
              address={places.road_address_name}
              code={places.category_group_code}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
