import {
  Button,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';

import { profileQueries } from '@/entities/profile';
import { LogoutButton } from '@/features/auth/logout';
import { pathKeys } from '@/shared/lib/react-router';
import { Link } from '@/shared/ui/link';

export function UserPopoverButton() {
  const profile = profileQueries.profileService.getCache();

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
            <Link to={pathKeys.auth.editProfile()} flexBasis="50%">
              <Button w="full" colorScheme="yellow">
                프로필 수정
              </Button>
            </Link>
            <LogoutButton flexBasis="50%" />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
