import { z } from 'zod';

import { Database } from '@/shared/lib/supabase/type';

import { GroupDtoSchema } from './schemas';

export type GroupDto = z.infer<typeof GroupDtoSchema>;
export type Group = Database['public']['Tables']['group']['Row'];
