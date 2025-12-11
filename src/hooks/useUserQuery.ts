import type { PagiUser, UserItem, UserItemEdit } from "@/interfaces/user.interface";
import type { UserItemAdd } from "@/interfaces/user.interface";
import {
  deleteUsersApi,
  getUsersListAllApi,
  getUsersListApi,
  postUsersApi,
  putUsersApi,
} from "@/services/users.api";
import { useUserAdminStore } from "@/stores/userManagement.store";
import { showSwal } from "@/utils/swal";
import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseQueryOptions,
  useQueryClient,
} from "@tanstack/react-query";
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
  optional?: Partial<
    Omit<
      UseQueryOptions<
        PagiUser<UserItem[]>,
        Error,
        PagiUser<UserItem[]>,
        [string, number, string | undefined]
      >,
      "queryKey" | "queryFn"
    >
  >
) =>
  useQuery({
    queryKey: ["users-list", pageIndex, keyword],
    queryFn: () => getUsersListApi(pageIndex, pageSize, keyword),
    ...optional,
  });

export const useUsersAddQuery = (
  optional?: Partial<
    Omit<
      UseMutationOptions<UserItemAdd, AxiosError, UserItemAdd, unknown>,
      "mutationFn"
    >
  >
) => {
  const queryClient = useQueryClient();
  const { setIsModal } = useUserAdminStore();

  return useMutation({
    mutationFn: postUsersApi,
    onSuccess: () => {
      setIsModal();
      queryClient.invalidateQueries({ queryKey: ["users-list"] });
      queryClient.invalidateQueries({ queryKey: ["users-list-all"] });
      showSwal({
        title: "Thêm thành công",
      });
    },
    onError: (error: AxiosError) => {
      const content = (error.response?.data as { content?: string } | undefined)
        ?.content;
      setIsModal();
      showSwal({
        title: "Thêm thất bại",
        text: content,
        icon: "error",
      });
    },
    ...optional,
  });
};

export const useUsersDeleteQuery = (
  optional?: Partial<
    Omit<UseMutationOptions<unknown, Error, unknown, unknown>, "mutationFn">
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUsersApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-list"] });
      queryClient.invalidateQueries({ queryKey: ["users-list-all"] });
    },
    onError: (error: AxiosError) => {
      const content = (error.response?.data as { content?: string } | undefined)
        ?.content;
      showSwal({
        title: 'Xoá thất bại',
        text: content,
        icon: "error",
      });
    },
    ...optional,
  });
};

export const useUsersEditQuery = (
  optional?: Partial<
    Omit<
      UseMutationOptions<UserItemEdit, AxiosError, UserItemEdit, unknown>,
      "mutationFn"
    >
  >
) => {
  const queryClient = useQueryClient();
  const { setIsModal } = useUserAdminStore();

  return useMutation({
    mutationFn: (payload: UserItemEdit) => putUsersApi(payload.id, payload),
    onSuccess: () => {
      setIsModal();
      queryClient.invalidateQueries({ queryKey: ["users-list"] });
      queryClient.invalidateQueries({ queryKey: ["users-list-all"] });
      showSwal({
        title: "Sửa thành công",
      });
    },
    onError: (error: AxiosError) => {
      const content = (error.response?.data as { content?: string } | undefined)
        ?.content;
      setIsModal();
      showSwal({
        title: "Sửa thất bại",
        text: content,
        icon: "error",
      });
    },
    ...optional,
  });
};