import { z } from 'zod';

import { GroupMemberDtoSchema } from './schemas';

export type GroupMemberDto = z.infer<typeof GroupMemberDtoSchema>;
