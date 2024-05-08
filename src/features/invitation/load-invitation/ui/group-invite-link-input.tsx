import { Flex } from '@chakra-ui/react';

import { useLatestInvitationByGroupId } from '@/entities/invitation';
import { CopyableInput } from '@/shared/ui/input';
import { LoadingCircle } from '@/shared/ui/loading';

export function GroupInviteLinkInput() {
  const { data: invitation, isLoading } = useLatestInvitationByGroupId();

  return (
    <>
      {isLoading ? (
        <Flex flex={1} alignItems="center" gap={4}>
          <LoadingCircle />
        </Flex>
      ) : (
        <CopyableInput
          leftText={`${import.meta.env.VITE_BASE_URL}/invitation/`}
          isDisabled
          value={invitation?.link ?? ''}
        />
      )}
    </>
  );
}
