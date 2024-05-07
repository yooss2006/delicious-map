import { z } from 'zod';

import { GroupDtoSchema } from '../model';

export type GroupDto = z.infer<typeof GroupDtoSchema>;
