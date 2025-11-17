import type { BaseApiResponse } from "@/interfaces/base.interface";
import type { PaginationRoom, RoomItems } from "@/interfaces/room.interface";
import api from "./api";
export const getRoomListApi = async (
  pageIndex: number,
  pageSize: number,
  keyword?: string
): Promise<PaginationRoom<RoomItems[]>> => {
  try {
    const key = keyword ? `&keyword=${keyword}` : "";
    const response = await api.get<
      BaseApiResponse<PaginationRoom<RoomItems[]>>
    >(
      `phong-thue/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}${key}`
    );
    return response.data.content;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getListRoomByLocation = async (maViTri: string) => {
  try {
    const response = await api.get(
      `phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`
    );
    return response.data.content;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
