import type { Location, PagiLocation } from "@/interfaces/location.interface";
import {
  deleteLocationsApi,
  getLocation,
  getLocationListApi,
  getProvinceApi,
  postLocationsApi,
  putLocationsApi,
} from "@/services/location.api";
import { useLocationAdminStore } from "@/stores/locationManagement.store";
import { showSwal } from "@/utils/swal";
import {
  useQuery,
  type UseMutationOptions,
  type UseQueryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useLocationListAllQuery = () =>
  useQuery({
    queryKey: ["location-list-all"],
    queryFn: () => getLocation(),
  });

export const useLocationListQuery = (
  pageIndex: number,
  pageSize: number,
  keyword?: string,
  optional?: Partial<
    Omit<
      UseQueryOptions<
        PagiLocation<Location[]>,
        Error,
        PagiLocation<Location[]>,
        [string, number, string | undefined]
      >,
      "queryKey" | "queryFn"
    >
  >
) =>
  useQuery({
    queryKey: ["location-list", pageIndex, keyword],
    queryFn: () => getLocationListApi(pageIndex, pageSize, keyword),
    ...optional,
  });

export const useLocationAddQuery = (
  optional?: Partial<
    Omit<
      UseMutationOptions<Location, AxiosError, FormData, unknown>,
      "mutationFn"
    >
  >
) => {
  const queryClient = useQueryClient();
  const { setIsModal } = useLocationAdminStore();

  return useMutation({
    mutationFn: postLocationsApi,
    onSuccess: () => {
      setIsModal();
      queryClient.invalidateQueries({ queryKey: ["location-list"] });
      queryClient.invalidateQueries({ queryKey: ["location-list-all"] });
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

export const useLocationDeleteQuery = (
  optional?: Partial<
    Omit<UseMutationOptions<unknown, Error, unknown, unknown>, "mutationFn">
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLocationsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["location-list"] });
      queryClient.invalidateQueries({ queryKey: ["location-list-all"] });
      showSwal({
        title: "Xoá thành công",
      });
    },
    onError: (error: AxiosError) => {
      const content = (error.response?.data as { content?: string } | undefined)
        ?.content;
      showSwal({
        title: "Xoá thất bại",
        text: content,
        icon: "error",
      });
    },
    ...optional,
  });
};

export const useLocationEditQuery = (
  optional?: Partial<
    Omit<
      UseMutationOptions<Location, AxiosError, Location, unknown>,
      "mutationFn"
    >
  >
) => {
  const queryClient = useQueryClient();
  const { setIsModal } = useLocationAdminStore();

  return useMutation({
    mutationFn: (payload: Location) => putLocationsApi(payload.id, payload),
    onSuccess: () => {
      setIsModal();
      queryClient.invalidateQueries({ queryKey: ["location-list"] });
      queryClient.invalidateQueries({ queryKey: ["location-list-all"] });
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

export const useProvinceQuery = () =>
  useQuery({
    queryKey: ["province-list"],
    queryFn: () => getProvinceApi(),
  });
