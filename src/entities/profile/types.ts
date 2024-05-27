import { z } from 'zod';

import { Database } from '@/shared/lib/supabase/type';

import { CreateProfileDtoSchema, EditProfileDtoSchema } from './schemas';

export type CreateProfileDto = z.infer<typeof CreateProfileDtoSchema>;
export type EditProfileDto = z.infer<typeof EditProfileDtoSchema>;
export type Profile = Database['public']['Tables']['profile']['Insert'];
