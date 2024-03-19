import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton,
  Input,
  List,
  ListItem,
  Text,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { PiBowlFoodDuotone, PiCoffeeDuotone } from 'react-icons/pi';
import { useSearchParams } from 'react-router-dom';

import { useKakaoMap } from '@/entities/kakao-map';
import { useSearchPlaces } from '@/features/kakao-places/search-places/hooks/use-search-places';
import { useParsedLocation } from '@/shared/hooks';

interface MerchantCardType {
  merchantId: string;
  lat: number;
  lng: number;
  name: string;
  address: string;
  code: string;
}

export function SearchBox() {
  const { query } = useParsedLocation();
  const q = query.q;
  return (
    <Flex w="100%" h="100%" mt={2} px={4} flexDirection="column">
      <SearchForm />
      {q && <SearchResultList />}
    </Flex>
  );
}

export default function SearchForm() {
  const [searchText, setSearchText] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleFormFinish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchText.replace(/^\s+|\s+$/g, '')) return;
    searchParams.set('q', searchText);
    setSearchParams(searchParams);
  };

  useEffect(() => setSearchText(''), []);
  return (
    <chakra.form onSubmit={handleFormFinish}>
      <Flex justifyContent="space-between" alignItems="center" gap={2}>
        <Input
          color="black"
          border="1px solid gray"
          value={searchText}
          onChange={handleChange}
          placeholder="장소 검색"
          size="lg"
        />
        <IconButton
          aria-label="Search Place"
          type="submit"
          icon={<SearchIcon />}
          size="lg"
          colorScheme="blue"
        />
      </Flex>
    </chakra.form>
  );
}

function SearchResultList() {
  const places = useSearchPlaces();
  return (
    <List mt={4} mb={8} maxH="90%" display="flex" flexDirection="column" gap={2} overflow="auto">
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

function MerchantCard(props: MerchantCardType) {
  const cardColor = useColorModeValue('gray.100', 'gray.900');
  const { lat, lng, name, address, code } = props;
  const { move } = useKakaoMap();

  const Icon = code === 'CE7' ? PiCoffeeDuotone : PiBowlFoodDuotone;
  const handleButtonClick = () => {
    move({ center: { lat, lng }, level: 1 });
  };

  return (
    <Card
      onClick={handleButtonClick}
      variant="outline"
      transition=".3s"
      _hover={{ background: cardColor }}
    >
      <CardBody position="relative">
        <Box as="article" display="flex" alignItems="center" gap="2">
          <Icon />
          <Heading fontSize="md" fontWeight={900}>
            {name}
          </Heading>
        </Box>
        <Text fontSize="sm" color="gray.500">
          {address}
        </Text>
      </CardBody>
    </Card>
  );
}
