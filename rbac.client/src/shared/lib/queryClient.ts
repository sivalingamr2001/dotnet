import { QueryCache, QueryClient, MutationCache } from '@tanstack/react-query';
import { message } from 'antd';

const toMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Something went wrong';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: true,
    },
  },
  queryCache: new QueryCache(),
  mutationCache: new MutationCache({
    onError: (error) => message.error(toMessage(error)),
  }),
});
