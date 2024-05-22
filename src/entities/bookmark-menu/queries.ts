import { useMutation } from '@tanstack/react-query';

import { createBookmarkMenu } from './api/create-bookmark-menu';

const keys = {
  root: () => ['bookmark-menu'],
  createBookmarkMenu: () => [...keys.root(), 'create'],
};

export const useCreateBookmarkMenuMutation = () => {
  return useMutation({
    mutationKey: keys.createBookmarkMenu(),
    mutationFn: createBookmarkMenu,
  });
};
