import { QueryClient } from '@tanstack/react-query';
export * from './query-key';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      retry: false,
    },
  },
});
