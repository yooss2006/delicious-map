import { z } from 'zod';

export const GroupDtoSchema = z.object({
  name: z.string().min(1, '그룹 이름을 입력하세요.'),
  description: z.string().min(1, '그룹 설명을 입력하세요.'),
  profileImage: z.any().optional(),
  creatorId: z.any().optional(),
});
