import { z } from 'zod';

import { LoginUserDtoSchema, SignUpUserDtoSchema } from '../model';

export type LoginUserDto = z.infer<typeof LoginUserDtoSchema>;
export type SignUpUserDto = z.infer<typeof SignUpUserDtoSchema>;
