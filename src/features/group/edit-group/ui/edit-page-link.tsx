import { Button, LinkProps, chakra } from '@chakra-ui/react';
import { AiFillSetting } from 'react-icons/ai';
import { useParams } from 'react-router-dom';

import { pathKeys } from '@/shared/lib/react-router';
import { Link } from '@/shared/ui/link';

export function EditPageLink(props: LinkProps) {
  const { id } = useParams();
  return (
    <Link to={pathKeys.group.edit(id ?? '')} {...props}>
      <Button w="100%" background="green.400" color="white" _hover={{ background: 'green.600' }}>
        <AiFillSetting />
        <chakra.span pl={1}>수정</chakra.span>
      </Button>
    </Link>
  );
}
