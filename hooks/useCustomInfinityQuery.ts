import { useInfiniteQuery, InfiniteData, QueryFunctionContext } from '@tanstack/react-query';

interface Props<T> {
  queryKey: (string | number | object)[];
  queryFn: (context: QueryFunctionContext<(string | number | object)[], any>) => Promise<T>;
}

export const useCustomInfiniteQuery = <T extends { cursorId?: number }>({ queryKey, queryFn }: Props<T>) =>
  useInfiniteQuery<T, Error, InfiniteData<T>, (string | number | object)[]>({
    queryKey,
    queryFn,
    getNextPageParam: (lastPage) => lastPage.cursorId,
    select: (data: InfiniteData<T>) => ({
      pages: data.pages.flatMap((page) =>
        (page as any).notifications || (page as any).reservations || (page as any).activities || (page as any).reservation || []
      ),
      pageParams: data.pageParams,
    }),
    initialPageParam: 0,
  });
