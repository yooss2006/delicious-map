import { Button, ButtonProps, chakra } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { ImExit } from 'react-icons/im';
import { useNavigate, useParams } from 'react-router-dom';

import { useGroupList } from '@/features/group/get-group-list/use-group-list';
import { queryClient } from '@/shared/lib';

import { deleteGroup } from '../lib/delete-group';

export function DeleteGroupButton(props: ButtonProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { groups = [] } = useGroupList();

  const { mutate } = useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      const filteredGroups = groups.filter((group) => group.id !== id);
      navigate(filteredGroups.length > 0 ? `/group/${filteredGroups[0]?.id}` : '/');
      queryClient.invalidateQueries({ queryKey: ['group_list'] });
    },
  });

  const handleDeleteGroup = () => {
    mutate(id);
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
