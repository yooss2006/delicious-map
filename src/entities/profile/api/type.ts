import { z } from 'zod';

import { CreateProfileDtoSchema, EditProfileDtoSchema } from '../model';

export type CreateProfileDto = z.infer<typeof CreateProfileDtoSchema>;
export type EditProfileDto = z.infer<typeof EditProfileDtoSchema>;
