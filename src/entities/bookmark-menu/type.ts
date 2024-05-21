import { z } from 'zod';

import { BookmarkMenuDtoSchema, CreateBookmarkMenuDtoSchema } from './model';

export type BookmarkMenuDto = z.infer<typeof BookmarkMenuDtoSchema>;
export type CreateBookmarkMenuDto = z.infer<typeof CreateBookmarkMenuDtoSchema>;
