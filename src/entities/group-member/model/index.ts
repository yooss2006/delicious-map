import { z } from 'zod';

export const GroupMemberDtoSchema = z.object({
  name: z.string().min(1, '그룹 이름을 입력하세요.'),
  groupId: z.string().optional(),
  profileId: z.number().optional(),
});
