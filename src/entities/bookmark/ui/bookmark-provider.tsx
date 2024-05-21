import { ReactNode, useContext, useMemo } from 'react';

import { BookmarkContext } from '../model';
import { BookmarkDto } from '../type';

export const useBookmark = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmark는 반드시 BookmarkProvider감싸져 있어야 사용가능합니다.');
  }
  return context;
};

export function BookmarkProvider({
  data,
  onSubmit,
  isLoading = false,
  children,
}: {
  data: BookmarkDto;
  onSubmit: (values: any) => void;
  isLoading?: boolean;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ data, onSubmit, isLoading }), [data, onSubmit, isLoading]);
  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
}
