import { z } from 'zod';

import { GroupMemberDtoSchema } from '../model';

export type GroupMemberDto = z.infer<typeof GroupMemberDtoSchema>;
