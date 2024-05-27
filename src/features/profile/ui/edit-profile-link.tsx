import { Button } from '@chakra-ui/react';

import { pathKeys } from '@/shared/lib/react-router';
import { Link } from '@/shared/ui/link';

export function EditProfileLink() {
  return (
    <Link to={pathKeys.auth.editProfile()}>
      <Button w="100%">프로필 수정</Button>
    </Link>
  );
}
