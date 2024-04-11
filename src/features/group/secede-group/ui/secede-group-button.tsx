import { Button, ButtonProps, chakra } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { ImExit } from 'react-icons/im';
import { useNavigate, useParams } from 'react-router-dom';

import { useCurrentUser } from '@/entities/user';
import { queryClient } from '@/shared/lib';

import { secedeGroup } from '../lib/secede-group';

export function SecedeGroupButton(props: ButtonProps) {
  const { id } = useParams();
  const { data: user } = useCurrentUser();
  const userId = user?.id;

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: secedeGroup,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['group_list'] });
      navigate('/');
    },
  });

  const handleDeleteGroup = () => {
    if (!(userId && id)) return;
    mutate({ userId, groupId: id });
  };

  return (
    <Button
      w="100%"
      background="red.700"
      color="white"
      {...props}
      _hover={{ background: 'red.900' }}
      onClick={handleDeleteGroup}
    >
      <ImExit />
      <chakra.span pl={1}>그룹 탈퇴</chakra.span>
    </Button>
  );
}
