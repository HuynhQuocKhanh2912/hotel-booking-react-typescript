import { create } from "zustand";

type useLocationAdminStore = {
  isModal: boolean,
  setIsModal: () => void,
  idLocation: number,
  setIdLocation: (newId: number) => void,
}

export const useLocationAdminStore = create<useLocationAdminStore>((set) => ({
  isModal: false,
  setIsModal: () => set((state) => ({ isModal: !state.isModal })),

  idLocation: 0,
  setIdLocation: (newId) => set({ idLocation: newId }),
}));
