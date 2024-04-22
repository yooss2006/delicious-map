import { List, ListItem, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getBookmarkByGroupId } from '@/entities/bookmark';
import { useSearchPlaces } from '@/features/kakao-places/search-places';
import { useParsedLocation } from '@/shared/hooks';
import { queryKey } from '@/shared/lib';
import { scrollNoneStyles } from '@/shared/style';

import { MerchantCard } from './merchant-card';

export function SearchResultList() {
  const { id } = useParams();
  const { query } = useParsedLocation();
  const q = query.q;
  const { data } = useQuery({
    queryKey: queryKey.bookmarkListByGroupId(id),
    queryFn: getBookmarkByGroupId,
    enabled: !!query.q,
  });

  console.log(data);

  const places = useSearchPlaces();

  if (!q) {
    return <Text mt={1}>음식점 또는 카페를 검색하세요.</Text>;
  }

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
