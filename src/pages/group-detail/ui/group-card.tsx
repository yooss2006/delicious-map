import { Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';

import { useGroupDetail } from '@/entities/group/api/get-group-by-group-id';

import { GroupInviteModal } from './group-invite-button';

export function GroupCard() {
  const { data: group } = useGroupDetail();

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
