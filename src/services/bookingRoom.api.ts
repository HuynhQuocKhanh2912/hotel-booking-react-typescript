import type { RoomPayload } from "@/interfaces/RoomPayload.interface";
import api from "./api";
import type { BaseApiResponse } from "@/interfaces/base.interface";

export const bookingRoom = async (data: RoomPayload) => {
  try {
    const response = await api.post<BaseApiResponse<RoomPayload>>(
      "/dat-phong",
      data
    );
    return response.data.content;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
