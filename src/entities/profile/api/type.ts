import { z } from 'zod';

import { CreateProfileDtoSchema } from '../model';

export type CreateProfileDto = z.infer<typeof CreateProfileDtoSchema>;
