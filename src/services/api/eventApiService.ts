import { ApiResponse } from "@/types/apiReponse";
import { Event } from "@/types/event";
import api from "./apiService";

export type EventsResponseType = ApiResponse<{
    list: Event[];
    total: number;
    total_page: number;
}>;

type EventsQuery = Record<string, string | number | string[]>;

export const EventsApi = async (
    query: EventsQuery
): Promise<EventsResponseType> => {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            params.append(key, value.join(","));
        } else if (value !== undefined && value !== null) {
            params.append(key, String(value));
        }
    });

    const response = await api.get<EventsResponseType>(
        `/event?${params.toString()}`
    );

    return response.data;
};
