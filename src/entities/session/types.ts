import { z } from 'zod';

import { LoginUserDtoSchema, SignUpUserDtoSchema } from './schemas';

export type LoginUserDto = z.infer<typeof LoginUserDtoSchema>;
export type SignUpUserDto = z.infer<typeof SignUpUserDtoSchema>;
