import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  IconButton,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';

import { BookmarkMenuDto, useMenu } from '@/entities/bookmark-menu';
import { scrollNoneStyles } from '@/shared/style';
import { StarRatingViewer } from '@/shared/ui/form';

export function Menulist() {
  const { menus, resetMenu } = useMenu();

  useEffect(() => {
    return () => resetMenu();
  }, [resetMenu]);

  if (menus.length === 0) return null;

  return (
    <Card h="320px" overflowY="scroll" sx={scrollNoneStyles}>
      <CardHeader>
        <Heading size="md">저장한 메뉴</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing={4}>
          {menus.map((menu, index) => (
            <Box key={`${menu.name}-${index}`}>
              <MenuItem menu={menu} />
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

type MenuItemProps = {
  menu: BookmarkMenuDto;
};

function MenuItem({ menu: { name, review, rating } }: MenuItemProps) {
  const { deleteMenu } = useMenu();
  const onDelete = () => {
    deleteMenu(name);
  };
  return (
    <Box position="relative">
      <Heading size="base" display="flex" alignItems="center" gap={2}>
        {name}
        <StarRatingViewer count={rating} />
      </Heading>
      <Text pt={1} fontSize="sm">
        {review}
      </Text>
      <IconButton
        variant="text"
        aria-label="메뉴 삭제"
        onClick={onDelete}
        icon={<CloseIcon />}
        fontSize="12px"
        size="xs"
        position="absolute"
        top={0}
        right={0}
      />
    </Box>
  );
}
