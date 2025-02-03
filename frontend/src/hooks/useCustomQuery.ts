import {
  QueryClient,
  QueryFunctionContext,
  useQuery,
  UseQueryOptions,
} from 'react-query';

// Access the key, status and page variables in your query function!
export const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
/* eslint-disable @typescript-eslint/no-explicit-any */
function fetcher({ queryKey }: QueryFunctionContext, apiProxy: any) {
  const [url, params] = queryKey as [string, unknown];
  return apiProxy.getRequest(url, {
    ...Object.assign({}, params),
  });
}

interface ExtendedUseQueryOptions<T = unknown, E = unknown, TData = T>
  extends UseQueryOptions<T, E, TData> {
  meta?: {
    userId?: string;
    timeout?: number;
  };
}

export function useBaseQuery<T = unknown, E = unknown, TData = T>(
  apiProxy: any,
  url: string,
  params?: unknown,
  options?: ExtendedUseQueryOptions<T, E, TData>
) {
  const key: any = [url];
  if (params) {
    key.push(params);
  }

  return useQuery<T, E, TData>({
    queryKey: key,
    queryFn: (context) => fetcher(context, apiProxy),
    retry: 1,
    ...options,
  });
}
