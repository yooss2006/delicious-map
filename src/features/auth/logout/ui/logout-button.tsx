import { Button, ButtonProps } from '@chakra-ui/react';

import { useLogout } from '@/entities/session';

export function LogoutButton(props: ButtonProps) {
  const { mutate: logout, isPending } = useLogout();
  return (
    <Button colorScheme="red" {...props} onClick={() => logout()} isLoading={isPending}>
      로그아웃
    </Button>
  );
}
