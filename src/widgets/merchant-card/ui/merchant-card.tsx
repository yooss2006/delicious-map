import { Box, Card, CardBody, Heading, Text } from '@chakra-ui/react';
import { Children, ReactNode } from 'react';
import { PiBowlFoodDuotone, PiCoffeeDuotone } from 'react-icons/pi';

import { MerchantTypeEnum } from '@/entities/merchant';

function Header({
  children,
  type,
  address,
}: {
  children: ReactNode;
  type: MerchantTypeEnum;
  address: string;
}) {
  const Icon = type === MerchantTypeEnum.Cafe ? PiCoffeeDuotone : PiBowlFoodDuotone;
  return (
    <Box as="header">
      <Box as="article" display="flex" alignItems="center" gap={1}>
        <Icon />
        <Heading
          w="90%"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          fontSize="md"
          fontWeight={900}
        >
          {children}
        </Heading>
      </Box>
      <Text
        w="90%"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        fontSize="sm"
        color="gray.500"
      >
        {address}
      </Text>
    </Box>
  );
}

export function MerchantCard({ children }: { children: React.ReactNode }) {
  const childrenArray = Children.toArray(children);
  const HeaderComponent = childrenArray.find(
    (child) => (child as { type: { name: string } }).type.name === 'Header'
  );
  return (
    <Card variant="outline" transition=".3s">
      <CardBody position="relative" display="flex" justifyContent="space-between">
        <Box w="100%">{HeaderComponent && <Box>{HeaderComponent}</Box>}</Box>
      </CardBody>
    </Card>
  );
}

MerchantCard.Header = Header;
