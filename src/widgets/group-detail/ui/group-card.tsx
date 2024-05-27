import { Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';

import { groupQueries } from '@/entities/group';
import { GroupInviteModal } from '@/widgets/group-invite-modal';

export function GroupCard() {
  const { data: group } = groupQueries.useGroupDetailBySlug();

  if (!group) return null;

  return (
    <Card _dark={{ background: 'gray.700' }}>
      <CardHeader py={3}>
        <Heading as="h3" fontSize="24px" textAlign="left">
          {group.name}
        </Heading>
      </CardHeader>
      <CardBody pt={0} pb={3}>
        <Text textAlign="left">{group.description}</Text>
        <GroupInviteModal />
      </CardBody>
    </Card>
  );
}
