import type { BaseApiResponse } from "@/interfaces/base.interface";
import api, { apiProvince } from "./api";
import type {
  Location,
  PagiLocation,
  ProvinceItem,
} from "@/interfaces/location.interface";

export const getLocation = async (): Promise<Location[]> => {
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

export const postLocationsApi = async (data: FormData): Promise<Location> => {
  try {
    const response = await api.post<BaseApiResponse<Location>>(`vi-tri/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.content;
  } catch (error) {
    console.log("🎄 ~ postLocationsApi ~ error:", error);
    throw error;
  }
};

export const deleteLocationsApi = async (id: number) => {
  try {
    await api.delete(`vi-tri/${id}`);
  } catch (error) {
    console.log("🎄 ~ deleteLocationsApi ~ error:", error);
    throw error;
  }
};

export const putLocationsApi = async (
  id: number,
  data: Location
): Promise<Location> => {
  try {
    const response = await api.put<BaseApiResponse<Location>>(
      `vi-tri/${id}`,
      data
    );
    return response.data.content;
  } catch (error) {
    console.log("🎄 ~ postLocationsApi ~ error:", error);
    throw error;
  }
};

// apiProvince
export const getProvinceApi = async (
  depth?: "lv2"
): Promise<ProvinceItem[]> => {
  try {
    // const dt = depth ? "?depth=2" : "p/";
    const dt = depth ? "?depth=2" : "";
    const response = await apiProvince.get<ProvinceItem[]>(dt);
    return response.data;
  } catch (error) {
    console.log("🌲 ~ getProvinceApi ~ error:", error);
    throw error;
  }
};
// export const getCountryApi = async (): Promise<BaseCountry[]> => {
//   try {
//     const response = await apiCountry.get<BaseCountry[]>('countries');
//     return response.data
//   } catch (error) {
//     console.log("🌲 ~ getCountryApi ~ error:", error)
//     throw error
//   }
// }
