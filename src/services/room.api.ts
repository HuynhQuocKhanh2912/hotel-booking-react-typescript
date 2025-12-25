import type { BaseApiResponse } from "@/interfaces/base.interface";
import type { PaginationRoom, RoomItems } from "@/interfaces/room.interface";
import api from "./api";
// get all rooms

export const getRoomsListAllApi = async () => {
  try {
    const response = await api.get<BaseApiResponse<RoomItems[]>>('phong-thue/');
    return response.data.content;
  } catch (error) {
    console.log("🎄 ~ getRoomsListAllApi ~ error:", error)
    throw error;
  }
}

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
// get room by location
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

// get room by id

export const getRoomByID = async (id: number): Promise<RoomItems> => {
  try {
    const response = await api.get<BaseApiResponse<RoomItems>>(
      `phong-thue/${id}`
    );
    return response.data.content;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
