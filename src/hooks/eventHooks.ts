import { EventsApi, EventsResponseType } from "@/services/api/eventApiService";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export type EventsQuery = Record<string, string | number | string[]>;

export function useFetchEvents(query: EventsQuery) {
    return useQuery<EventsResponseType>({
        queryKey: ["events", query],
        queryFn: async () => {
            const resp = await EventsApi(query);
            return resp;
        },
        staleTime: 10000,
        retry: false,
    });
}

export function useInfiniteEvents(baseQuery: Omit<EventsQuery, 'page'>) {
    return useInfiniteQuery<EventsResponseType>({
        queryKey: ["events", "infinite", baseQuery],
        queryFn: async ({ pageParam = 1 }) => {
            const resp = await EventsApi({ ...baseQuery, page: pageParam as number });
            return resp;
        },
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = allPages.length;
            const totalPages = lastPage.data.total_page;
            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        initialPageParam: 1,
        staleTime: 10000,
        retry: false,
    });
}
