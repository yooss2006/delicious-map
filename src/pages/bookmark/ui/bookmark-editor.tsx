import { ChevronRightIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, IconButton } from '@chakra-ui/react';
import { useState } from 'react';

import { BookmarkForm } from './bookmark-form';
import { BookmarkHeader } from './bookmark-header';
import { BookmarkMenuForm } from './bookmark-menu-form';

interface ContentProps {
  open: boolean;
  toggleOpen: () => void;
}

const BookmarkContent = ({ open, toggleOpen }: ContentProps) => {
  return (
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
      <BookmarkHeader />
      <BookmarkForm />
      <Button
        onClick={toggleOpen}
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
  );
};

const BookmarkMenuContent = ({ open, toggleOpen }: ContentProps) => {
  return (
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
      {open && <BookmarkMenuForm />}
      <IconButton
        aria-label="메뉴 닫기"
        position="absolute"
        right={2}
        top={2}
        size="lg"
        variant="ghost"
        onClick={toggleOpen}
        icon={<CloseIcon />}
      >
        삭제
      </IconButton>
    </Box>
  );
};

export function BookmarkEditor() {
  const [open, setOpen] = useState(false);

  const props = {
    open,
    toggleOpen: () => setOpen((prev) => !prev),
  };

  return (
    <>
      <BookmarkContent {...props} />
      <BookmarkMenuContent {...props} />
    </>
  );
}
