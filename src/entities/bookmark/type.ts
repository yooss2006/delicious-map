import { z } from 'zod';

import { Database } from '@/shared/lib/supabase/type';

import { BookmarkDtoSchema, CreateBookmarkDtoSchema } from './model';

export type Bookmark = Database['public']['Tables']['bookmark']['Insert'];
export type BookmarkDto = z.infer<typeof BookmarkDtoSchema>;
export type CreateBookmarkDto = z.infer<typeof CreateBookmarkDtoSchema>;
