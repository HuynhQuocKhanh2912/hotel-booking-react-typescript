import { create } from "zustand";

type useUserAdminStore = {
  isModal: boolean,
  setIsModal: () => void,
  idUser: number,
  setIdUser: (newId: number) => void,
}

export const useUserAdminStore = create<useUserAdminStore>((set) => ({
  isModal: false,
  setIsModal: () => set((state) => ({ isModal: !state.isModal })),

  idUser: 0,
  setIdUser: (newId) => set({ idUser: newId }),

  //   bears: 0,
  //   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 }),
  //   updateBears: (newBears) => set({ bears: newBears }),
}));
