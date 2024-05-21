import { RouteObject } from 'react-router-dom';

import { lazyImport } from '@/shared/lib/lazy-import';

const { CreateBookmarkPage } = lazyImport(
  () => import('./page/create-bookmark-page'),
  'CreateBookmarkPage'
);

export const BookmarkRoutes: RouteObject = {
  path: 'bookmark',
  children: [
    {
      path: 'create',
      element: <CreateBookmarkPage />,
    },
  ],
};
