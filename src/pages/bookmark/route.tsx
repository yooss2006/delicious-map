import { RouteObject } from 'react-router-dom';

import { lazyImport } from '@/shared/lib/lazy-import';
import { pathKeys } from '@/shared/lib/react-router';

const { CreateBookmarkPage } = lazyImport(
  () => import('./page/create-bookmark-page'),
  'CreateBookmarkPage'
);

export const BookmarkRoutes: RouteObject = {
  path: pathKeys.bookmark.root(),
  children: [
    {
      path: pathKeys.bookmark.create(),
      element: <CreateBookmarkPage />,
    },
  ],
};
