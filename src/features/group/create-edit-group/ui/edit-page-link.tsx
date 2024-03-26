import { Button, Link as ChakraLink, LinkProps, chakra } from '@chakra-ui/react';
import { AiFillSetting } from 'react-icons/ai';
import { useParams, Link } from 'react-router-dom';

export function EditPageLink(props: LinkProps) {
  const { id } = useParams();
  return (
    <ChakraLink as={Link} to={`/edit-group/${id}`} {...props}>
      <Button w="100%" background="green.400" color="white" _hover={{ background: 'green.600' }}>
        <AiFillSetting />
        <chakra.span pl={1}>수정</chakra.span>
      </Button>
    </ChakraLink>
  );
}
