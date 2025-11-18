import type { PagiUser, UserItem } from "@/interfaces/user.interface";
import type { UserItemAdd } from "@/interfaces/user.interface";
import { getUsersListAllApi, getUsersListApi, postUsersApi } from "@/services/users.api";
import { useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from "@tanstack/react-query";

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

export const useUsersAddQuery = (
  optional?: Partial<Omit<UseMutationOptions<UserItemAdd, Error, UserItemAdd, unknown>, "mutationFn">>
) => {
  return useMutation({
    mutationFn: postUsersApi,
    onSuccess: () => {
      console.log('asdasd')
    },
    onError: () => {

    },
    ...optional
  });
}