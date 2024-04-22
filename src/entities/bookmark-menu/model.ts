import { create } from 'zustand';

import { BookmarkMenuFormValue } from './type';

type Props = {
  menus: Array<BookmarkMenuFormValue>;
  addMenu: (menu: BookmarkMenuFormValue) => void;
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
