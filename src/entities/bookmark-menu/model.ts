import { z } from 'zod';
import { create } from 'zustand';

import { BookmarkMenuDto } from './type';

type Props = {
  menus: Array<BookmarkMenuDto>;
  addMenu: (menu: BookmarkMenuDto) => void;
  deleteMenu: (name: string) => void;
  resetMenu: () => void;
};

export const useMenu = create<Props>((set) => ({
  menus: [],
  addMenu: (menu) => set((state) => ({ menus: [...state.menus, menu] })),
  deleteMenu: (name) =>
    set((state) => ({ menus: state.menus.filter((menu) => name !== menu.name) })),
  resetMenu: () => set({ menus: [] }),
}));

export const BookmarkMenuDtoSchema = z.object({
  name: z.string().min(1, '메뉴 이름을 입력하세요.'),
  rating: z.number(),
  review: z.string().min(1, '리뷰를 입력하세요.'),
  bookmarkId: z.string(),
});

export const CreateBookmarkMenuDtoSchema = z.object({
  name: z.string().min(1, '메뉴 이름을 입력하세요.'),
  rating: z.number(),
  review: z.string().min(1, '리뷰를 입력하세요.'),
  bookmark_id: z.string(),
});
