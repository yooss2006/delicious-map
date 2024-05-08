import { EmailIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { useLatestInvitationByGroupId, useCreateInvitationMutation } from '@/entities/invitation';

export function CreateInviteButton() {
  const { id } = useParams();
  const { data: invitation, isLoading } = useLatestInvitationByGroupId();
  const { mutate, isPending } = useCreateInvitationMutation();
  const handleCreateInvitation = () => {
    if (!id) return;
    mutate({ groupId: id });
  };

  const isCreateInvitation = (date?: string) => {
    if (!date) return false;
    const nowDay = new Date().getTime();
    const oneDayLater = new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000).getTime();

    return nowDay >= oneDayLater;
  };

  return (
    <Button
      px={8}
      leftIcon={<EmailIcon />}
      onClick={handleCreateInvitation}
      isLoading={isPending || isLoading}
      isDisabled={!!invitation && !isCreateInvitation(invitation?.created_at)}
    >
      초대 링크 생성
    </Button>
  );
}
