import { SettingsIcon } from '@chakra-ui/icons';
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
  IconButton,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FaCrown } from 'react-icons/fa6';

import { groupQueries } from '@/entities/group';
import { profileQueries } from '@/entities/profile';
import { pathKeys } from '@/shared/lib/react-router';
import { scrollNoneStyles } from '@/shared/style';
import { Link } from '@/shared/ui/link';
import { LoadingCircle } from '@/shared/ui/loading';
import { GroupInviteModal } from '@/widgets/group-invite-modal';

function GroupIntroduceCard() {
  const { data: group } = groupQueries.useGroupDetailBySlug();
  console.log(group);

  if (!group) return null;

  return (
    <Card position="relative" _dark={{ background: 'gray.700' }}>
      <CardHeader py={3} display="flex" alignItems="center" gap={2}>
        <Heading as="h3" fontSize="24px" textAlign="left">
          {group.name}
        </Heading>
        <Text pb={1} fontSize={12} color="gray.500">
          {dayjs(group.created_at).format('YYYY-MM-DD')}
        </Text>
      </CardHeader>
      <CardBody pt={0} pb={3}>
        <Text textAlign="left">{group.description}</Text>
        <Box
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
          right={3}
          display="flex"
          gap={2}
        >
          <GroupInviteModal />
          <Link to={pathKeys.group.setting(group.id)} color="gray.500">
            <IconButton icon={<SettingsIcon />} aria-label="그룹 수정 버튼" />
          </Link>
        </Box>
      </CardBody>
    </Card>
  );
}

export function GroupMemberList() {
  const { data: group, isLoading: isGroupLoading } = groupQueries.useGroupDetailBySlug();
  const currentProfile = profileQueries.profileService.getCache();
  if (isGroupLoading) return <LoadingCircle />;

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

export function MainContent() {
  return (
    <Box w="100%" p={3}>
      <GroupIntroduceCard />
      <GroupMemberList />
    </Box>
  );
}
