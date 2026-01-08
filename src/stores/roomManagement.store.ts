import { create } from "zustand";

type useRoomAdminStore = {
  isModal: boolean,
  setIsModal: () => void,
  idRoom: number,
  setIdRoom: (newId: number) => void,
}

export const useRoomAdminStore = create<useRoomAdminStore>((set) => ({
  isModal: false,
  setIsModal: () => set((state) => ({ isModal: !state.isModal })),

  idRoom: 0,
  setIdRoom: (newId) => set({ idRoom: newId }),
}));
