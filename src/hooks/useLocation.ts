import type { Location, PagiLocation } from "@/interfaces/location.interface";
import { getLocation, getLocationListApi, getProvinceApi } from "@/services/location.api";
import {
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";

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


export const useProvinceQuery = () =>
  useQuery({
    queryKey: ["province-list"],
    queryFn: () => getProvinceApi(),
  });