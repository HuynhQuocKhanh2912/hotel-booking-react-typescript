import type { CommentsID } from "@/interfaces/commentsID.interface";
import api from "./api";
import type { BaseApiResponse } from "@/interfaces/base.interface";

export const getCommentsList = async (
  id: number
): Promise<CommentsID[] | undefined> => {
  try {
    const response = await api.get<BaseApiResponse<CommentsID[]>>(
      `/binh-luan/lay-binh-luan-theo-phong/${id}`
    );
    return response.data.content;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
