import { Button, ButtonProps } from '@chakra-ui/react';

import { sessionQueries } from '@/entities/session';

export function LogoutButton(props: ButtonProps) {
  const { mutate: logout, isPending } = sessionQueries.useLogoutMutation();
  return (
    <Button colorScheme="red" {...props} onClick={() => logout()} isLoading={isPending}>
      로그아웃
    </Button>
  );
}
