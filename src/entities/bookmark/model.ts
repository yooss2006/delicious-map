import { createContext } from 'react';
import { z } from 'zod';

import { BookmarkDto } from './type';

export const BookmarkContext = createContext<{
  data: BookmarkDto;
  onSubmit: (values: Record<string, any>) => void;
} | null>(null);

export const BookmarkDtoSchema = z.object({
  merchantId: z.string(),
  groupId: z.string(),
  merchantName: z.string(),
  address: z.string(),
  lat: z.number(),
  lng: z.number(),
  rating: z.number().min(1, '별점을 입력하세요.'),
  review: z.string().min(1, '생각을 작성하세요.'),
  visitDate: z.string().min(1, '방문 날짜를 입력하세요.'),
  image: z.array(z.any()),
  type: z.enum(['restaurant', 'cafe']),
  managerId: z.number(),
});

export const CreateBookmarkDtoSchema = z.object({
  merchant_id: z.string(),
  group_id: z.string(),
  merchant_name: z.string(),
  address: z.string(),
  lat: z.number(),
  lng: z.number(),
  rating: z.number(),
  review: z.string(),
  visit_date: z.string(),
  image: z.array(z.any()),
  type: z.enum(['restaurant', 'cafe']),
  manager_id: z.number(),
});
