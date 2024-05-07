import {
  Button,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { useProfile } from '@/entities/profile';
import { LogoutButton } from '@/features/auth/logout';

export function UserPopoverButton() {
  const { data: profile } = useProfile();

  return (
    <Popover placement="right-start">
      <PopoverTrigger>
        <Button w={14} h={14} p={0} borderRadius="md" overflow="hidden">
          <Image
            src={profile?.image ?? ''}
            alt="프로필 이미지"
            w="100%"
            h="100%"
            objectFit="cover"
            fallback={<AiOutlineUser fontSize={30} />}
          />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody display="flex" gap={2}>
            <ChakraLink as={Link} to="/edit-profile" flexBasis="50%">
              <Button w="full" colorScheme="yellow">
                프로필 수정
              </Button>
            </ChakraLink>
            <LogoutButton flexBasis="50%" />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
