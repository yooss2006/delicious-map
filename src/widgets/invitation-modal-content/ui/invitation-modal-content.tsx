import { Box, Card, CardBody, CardFooter, Heading, Img, Stack, Text } from '@chakra-ui/react';

import { useInvitationByLink } from '@/entities/invitation';
import { JoinGroupButton } from '@/features/member/create-group-member';
import { LoadingCircle } from '@/shared/ui/loading';

export function InvitationModalContent() {
  const { data, isLoading } = useInvitationByLink();

  if (isLoading) return <LoadingCircle />;
  const group = data?.group as any;

  if (!group) return '만료된 초대 링크입니다.';

  return (
    <Box>
      <Text textAlign="center">당신은 "{group.name}" 그룹에 초대되셨습니다.</Text>
      <Card direction="row" variant="filled" my={3} _dark={{ background: 'gray.800' }}>
        <Img objectFit="cover" maxW={20} src={group.image} alt={group.name} />
        <Stack flex="1">
          <CardBody>
            <Heading as="h2" fontSize="20px" mb={4}>
              그룹 이름 : {group.name}
            </Heading>
            <Text mb={2}>{group.description}</Text>
          </CardBody>
        </Stack>
        <CardFooter display="flex" alignItems="center">
          <JoinGroupButton groupId={group.id} />
        </CardFooter>
      </Card>
    </Box>
  );
}
