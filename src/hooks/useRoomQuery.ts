import type { PaginationRoom, RoomItems } from "@/interfaces/room.interface";
import { getRoomListApi, getRoomsListAllApi } from "@/services/room.api";
import {
    useQuery,
    type UseQueryOptions,
} from "@tanstack/react-query";

export const useUsersListAllQuery = () =>
    useQuery({
        queryKey: ["rooms-list-all"],
        queryFn: () => getRoomsListAllApi(),
    });

export const useRoomListQuery = (
    pageIndex: number,
    pageSize: number,
    keyword?: string,
    optional?: Partial<
        Omit<
            UseQueryOptions<
                PaginationRoom<RoomItems[]>,
                Error,
                PaginationRoom<RoomItems[]>,
                [string, number, string | undefined]
            >,
            "queryKey" | "queryFn"
        >
    >
) =>
    useQuery({
        queryKey: ["rooms-list", pageIndex, keyword],
        queryFn: () => getRoomListApi(pageIndex, pageSize, keyword),
        ...optional,
    });

