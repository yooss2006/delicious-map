import { Box, Card, CardBody, CardHeader, Heading } from '@chakra-ui/react';

import { GroupCard, GroupMemberList } from '@/widgets/group-detail-main';

export function MainBox() {
  return (
    <Box w="100%" p={3}>
      <GroupCard />
      <Card mt={4}>
        <CardHeader>
          <Heading as="h4" fontSize="20px">
            그룹 구성원
          </Heading>
        </CardHeader>
        <CardBody>
          <GroupMemberList />
        </CardBody>
      </Card>
    </Box>
  );
}
