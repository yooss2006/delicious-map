import { Button } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { useGroupList } from '@/pages/group-detail/hooks/useGroupList';
import { queryClient } from '@/shared/lib';

import { deleteGroup } from '../lib/delete-group';

export function DeleteGroupButton() {
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
    <Button w="100%" onClick={handleDeleteGroup}>
      그룹 탈퇴
    </Button>
  );
}
