import type { PagiUser, UserItem, UserItemAdd } from "@/interfaces/user.interface";
import { getUsersListAllApi, getUsersListApi, postUsersApi } from "@/services/users.api";
import { useMutation, useQuery, type UseQueryOptions } from "@tanstack/react-query";

export const useUsersListAllQuery = () =>
  useQuery({
    queryKey: ["users-list-all"],
    queryFn: () => getUsersListAllApi(),
  });

export const useUsersListQuery = (
  pageIndex: number,
  pageSize: number,
  keyword?: string,
  optional?: Partial<Omit<UseQueryOptions<PagiUser<UserItem[]>, Error, PagiUser<UserItem[]>, [string, number, string | undefined]>, "queryKey" | "queryFn">>
) =>
  useQuery({
    queryKey: ["users-list", pageIndex, keyword],
    queryFn: () => getUsersListApi(pageIndex, pageSize, keyword),
    ...optional,
  });

export const useUsersAddQuery = (data: UserItemAdd) =>
  useMutation({
    mutationFn: () => postUsersApi(data),
    onSuccess: () => {
      console.log('asdasd')
    },
    onError: () => {

    }
  });