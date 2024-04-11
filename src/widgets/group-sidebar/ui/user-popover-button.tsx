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

import { useCurrentUser } from '@/entities/user';
import { LogoutButton } from '@/features/auth/logout';

export function UserPopoverButton() {
  const { data: user } = useCurrentUser();
  const profileImage = user?.user_metadata?.avatar_url ?? '';
  return (
    <Popover placement="right-start">
      <PopoverTrigger>
        <Button w={14} h={14} p={0} borderRadius="md" overflow="hidden">
          <Image src={profileImage} alt="프로필 이미지" w="100%" h="100%" objectFit="cover" />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody display="flex" flexDirection="column" gap={2}>
            <LogoutButton />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
