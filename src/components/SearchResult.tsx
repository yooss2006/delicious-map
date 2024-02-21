import { List, ListItem } from '@chakra-ui/react';

import { Place } from '@/types/place';

import MerchantCard from './MerchantCard';

type Props = {
  places: Array<Place>;
};

export default function SearchResult({ places }: Props) {
  return (
    <List flex={1} display="flex" flexDirection="column" gap={2} maxH="100%" mt={4} overflow="auto">
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
