import { Avatar, List, ListItem } from '@chakra-ui/react';

import { GroupMember, useGroupMember } from '@/entities/group-member';

export function GroupMemberList() {
  const { data: members = [] } = useGroupMember();
  return (
    <List>
      {members.map((member: GroupMember) => (
        <GroupMemberListItem key={member.member_id} data={member} />
      ))}
    </List>
  );
}

function GroupMemberListItem({ data }: { data: GroupMember }) {
  return (
    <ListItem>
      <Avatar name={String(data.member_id)} src={data.image_url} />
    </ListItem>
  );
}
