import { create } from 'zustand';

import { ReviewMenu } from './types';

type Props = {
  menus: Array<ReviewMenu>;
  addMenu: (menu: ReviewMenu) => void;
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
