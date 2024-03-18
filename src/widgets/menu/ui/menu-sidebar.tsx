import { Flex } from '@chakra-ui/react';

import { MenuList } from './menu-list';

export function MenuSidebar() {
  return (
    <Flex
      paddingY={2}
      flexBasis="80px"
      flexDirection="column"
      alignItems="center"
      gap={4}
      background="white"
      borderRight="1px"
      borderColor="gray.200"
    >
      <MenuList />
    </Flex>
  );
}
