import { Button } from '@chakra-ui/react';

import { useCreateGroupMemberMutation } from '@/entities/group-member';
import { profileQueries } from '@/entities/profile';

type Props = {
  groupId: string;
};

// 현재 로그인된 유저를 그룹에 추가하는 버튼
export function JoinGroupButton({ groupId }: Props) {
  const profile = profileQueries.profileService.getCache();
  const { mutate } = useCreateGroupMemberMutation(groupId);

  const handleButtonClick = () => {
    if (!profile) return;
    mutate({
      profileId: profile?.id,
      groupId,
      name: profile?.name,
    });
  };

  return <Button onClick={handleButtonClick}>가입</Button>;
}
