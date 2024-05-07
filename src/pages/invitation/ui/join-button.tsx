import { Button } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useProfile } from '@/entities/profile';
import { createGroupMember } from '@/features/member/create-group-member';

type Props = {
  groupId: string;
};

// 현재 로그인된 유저를 그룹에 추가하는 버튼
export function JoinButton({ groupId }: Props) {
  const { data: profile } = useProfile();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: createGroupMember,
    onSuccess() {
      navigate(`/group/${groupId}`);
    },
  });

  const handleButtonClick = () => {
    if (!profile) return;
    mutate({
      profileId: profile?.id,
      groupId,
      image: profile?.image ?? '',
      name: profile?.name,
    });
  };

  return <Button onClick={handleButtonClick}>가입</Button>;
}
