import { Avatar, List, ListItem } from '@chakra-ui/react';

import { useGroupDetail } from '@/entities/group/api/group-detail';
import { Database } from '@/shared/lib/supabase/type';
import { scrollNoneStyles } from '@/shared/style';
import { LoadingCircle } from '@/shared/ui/loading';

export function GroupMemberList() {
  const { data: group, isLoading } = useGroupDetail();

  if (isLoading) return <LoadingCircle />;

  return (
    <List maxH="400px" display="flex" flexDirection="column" gap={2} sx={scrollNoneStyles}>
      {group?.member.map((member) => <GroupMemberListItem key={member.id} data={member} />)}
    </List>
  );
}

function GroupMemberListItem({
  data,
}: {
  data: Database['public']['Tables']['group_member']['Row'] & {
    profile: Database['public']['Tables']['profile']['Row'] | null;
  };
}) {
  return (
    <ListItem display="flex" alignItems="center" gap={2} fontSize="14px">
      <Avatar name={String(data.id)} src={data?.profile?.image ?? ''} size="xs" />
      {data.name}
    </ListItem>
  );
}
