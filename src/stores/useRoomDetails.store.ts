import type { RoomItems } from "@/interfaces/room.interface";
import { create } from "zustand";

type roomDetailStore = {
  roomID: RoomItems | null;
  setRoomDetail: (data: RoomItems | null) => void;
};

export const useRoomDetail = create<roomDetailStore>((set) => ({
  roomID: null,
  setRoomDetail: (data) => set({ roomID: data }),
}));
