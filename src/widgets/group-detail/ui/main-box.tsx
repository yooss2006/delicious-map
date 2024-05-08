import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Avatar,
  List,
  ListItem,
} from '@chakra-ui/react';
import { FaCrown } from 'react-icons/fa6';

import { useGroupDetail } from '@/entities/group/api/group-detail';
import { useProfile } from '@/entities/profile';
import { scrollNoneStyles } from '@/shared/style';
import { LoadingCircle } from '@/shared/ui/loading';
import { GroupInviteModal } from '@/widgets/group-invite-modal';

export function MainBox() {
  return (
    <Box w="100%" p={3}>
      <GroupIntroduceCard />
      <GroupMemberList />
    </Box>
  );
}

function GroupIntroduceCard() {
  const { data: group } = useGroupDetail();

  if (!group) return null;

  return (
    <Card position="relative" _dark={{ background: 'gray.700' }}>
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

export function GroupMemberList() {
  const { data: group, isLoading: isGroupLoading } = useGroupDetail();
  const { data: currentProfile, isLoading: isProfileLoading } = useProfile();
  if (isProfileLoading || isGroupLoading) return <LoadingCircle />;

  return (
    <Card mt={4} size="sm">
      <CardHeader>
        <Heading as="h4" fontSize="20px">
          그룹 구성원
        </Heading>
      </CardHeader>
      <CardBody>
        <List maxH="400px" display="flex" flexDirection="column" gap={2} sx={scrollNoneStyles}>
          {group?.member.map(({ name, id, profile }) => (
            <ListItem key={id} display="flex" alignItems="center" gap={2} fontSize="14px">
              <Avatar name={String(id)} src={profile?.image ?? ''} size="xs" />
              {name} {currentProfile?.id === group?.profile?.id && <FaCrown color="orange" />}
            </ListItem>
          ))}
        </List>
      </CardBody>
    </Card>
  );
}
