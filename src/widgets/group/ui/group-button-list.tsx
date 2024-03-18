import { Button, Flex, Image } from '@chakra-ui/react';
import { AiOutlineLoading } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import { Database } from '@/shared/lib/supabase/type';

type Props = {
  groups?: Array<Database['public']['Tables']['groups']['Row']>;
};

export function GroupButtonList({ groups = [] }: Props) {
  const navigate = useNavigate();
  return (
    <Flex flexDirection="column" gap={4} alignItems="center">
      {groups?.map(({ id, name, image_url }) => (
        <Button
          key={id}
          w={14}
          h={14}
          p={0}
          borderRadius="md"
          boxSizing="content-box"
          _hover={{ boxShadow: '0 0 0 3px #3182ce' }}
          onClick={() => navigate(`/group/${id}`)}
        >
          <Image
            src={image_url ? image_url : undefined}
            alt={name}
            w="100%"
            h="100%"
            objectFit="cover"
            fallback={<AiOutlineLoading />}
            borderRadius="md"
          />
        </Button>
      ))}
    </Flex>
  );
}
