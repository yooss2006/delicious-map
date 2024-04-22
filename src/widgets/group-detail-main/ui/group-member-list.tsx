import { Avatar, List, ListItem } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getGroupByGroupId } from '@/entities/group/api/get-group-by-group-id';
import { queryKey } from '@/shared/lib';
import { Database } from '@/shared/lib/supabase/type';
import { scrollNoneStyles } from '@/shared/style';

export function GroupMemberList() {
  const { id } = useParams();

  const { data: group, isLoading } = useQuery({
    queryKey: queryKey.groupDetail(id),
    queryFn: getGroupByGroupId,
  });

  if (isLoading) return '...준비중';

  return (
    <List maxH="400px" display="flex" flexDirection="column" gap={2} sx={scrollNoneStyles}>
      {group?.members.map((member) => <GroupMemberListItem key={member.member_id} data={member} />)}
    </List>
  );
}

function GroupMemberListItem({
  data,
}: {
  data: Database['public']['Tables']['group_members']['Row'];
}) {
  return (
    <ListItem display="flex" alignItems="center" gap={2} fontSize="14px">
      <Avatar name={String(data.member_id)} src={data.image_url} size="xs" />
      {data.name}
    </ListItem>
  );
}
