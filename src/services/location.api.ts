import type { BaseApiResponse } from "@/interfaces/base.interface";
import api from "./api";
import type { Location, PagiLocation } from "@/interfaces/location.interface";

export const getLocation = async (): Promise<Location[] | undefined> => {
  try {
    const response = await api.get<BaseApiResponse<Location[]>>("vi-tri");
    return response.data.content;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getLocationListApi = async (
  pageIndex: number,
  pageSize: number,
  keyword?: string
): Promise<PagiLocation<Location[]>> => {
  try {
    const key = keyword ? `&keyword=${keyword}` : "";
    const response = await api.get<BaseApiResponse<PagiLocation<Location[]>>>(
      `vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}${key}`
    );
    return response.data.content;
  } catch (error) {
    console.log("🎄 ~ getLocationListApi ~ error:", error);
    throw error;
  }
};
