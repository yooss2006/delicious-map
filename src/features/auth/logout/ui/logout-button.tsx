import { Button } from '@chakra-ui/react';

import { useLogout } from '@/entities/session';

export function LogoutButton() {
  const { mutate: logout, isPending } = useLogout();
  return (
    <Button
      _dark={{ background: 'red.800', _hover: { background: 'red.900' } }}
      onClick={() => logout()}
      isLoading={isPending}
    >
      로그아웃
    </Button>
  );
}
