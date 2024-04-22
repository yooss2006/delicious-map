import { ChevronRightIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, IconButton } from '@chakra-ui/react';
import { useState } from 'react';

import { BookmarkMenuForm } from '@/widgets/bookmark-form';

type Props = {
  children: React.ReactNode;
};

export function MenuToggleContainer({ children }: Props) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        as="section"
        w="440px"
        h="100%"
        px={4}
        py={4}
        position="relative"
        zIndex={20}
        borderRightWidth="1px"
        borderColor="gray.300"
        background="gray.50"
      >
        {children}
        <Button
          onClick={() => setOpen((prev) => !prev)}
          position="absolute"
          top="16px"
          right={4}
          transition="opacity 0.2s, transform 0.5s"
          opacity={!open ? 1 : 0}
          transform={'translateX(' + (!open ? '0' : '144px') + ')'}
        >
          <ChevronRightIcon />
          메뉴
        </Button>
      </Box>
      <Box
        as="section"
        w="400px"
        h="100%"
        position="absolute"
        top={0}
        left="520px"
        zIndex={10}
        transitionDelay="0.02"
        transform={'translateX(' + (open ? '0' : '-400px') + ')'}
        transition=" all 0.4s"
        background="white"
        borderRightWidth="1px"
        borderColor="gray.100"
      >
        <Heading py={4} lineHeight={2} as="h2" fontSize="lg" textAlign="center">
          메뉴
        </Heading>
        {open && <BookmarkMenuForm closeMenu={closeMenu} />}
        <IconButton
          aria-label="메뉴 닫기"
          position="absolute"
          right={2}
          top={2}
          size="lg"
          variant="ghost"
          onClick={() => setOpen(false)}
          icon={<CloseIcon />}
        >
          삭제
        </IconButton>
      </Box>
    </>
  );
}
