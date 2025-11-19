import type { PagiUser, UserItem } from "@/interfaces/user.interface";
import type { UserItemAdd } from "@/interfaces/user.interface";
import { deleteUsersApi, getUsersListAllApi, getUsersListApi, postUsersApi } from "@/services/users.api";
import { useUserAdminStore } from "@/stores/userManagement.store";
import { showSwal } from "@/utils/swal";
import { useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";



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
  optional?: Partial<Omit<UseMutationOptions<UserItemAdd, AxiosError, UserItemAdd, unknown>, "mutationFn">>
) => {
  const { setIsModal } = useUserAdminStore();

  return useMutation({
    mutationFn: postUsersApi,
    onSuccess: () => {
      setIsModal()
      showSwal({
        title: 'Thêm thành công'
      })
    },
    onError: (error:any) => {
      setIsModal()
      showSwal({
        title: 'Thêm thất bại',
        text: error?.response?.data?.content,
        icon: "error"
      })
    },
    ...optional
  });
}

export const useUsersDeleteQuery = (
  optional?: Partial<Omit<UseMutationOptions<unknown, Error, unknown, unknown>, "mutationFn">>
) => {
  return useMutation({
    mutationFn: deleteUsersApi,
    onSuccess: () => {
      console.log('onSuccess DELETE')
    },
    onError: () => {

    },
    ...optional
  });
}