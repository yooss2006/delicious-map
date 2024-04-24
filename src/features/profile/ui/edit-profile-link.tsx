import { Button, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export function EditProfileLink() {
  return (
    <ChakraLink as={Link} to="/edit-profile">
      <Button w="100%">프로필 수정</Button>
    </ChakraLink>
  );
}
