import { create } from "zustand";

type useUserAdminStore  = {
  isModal:boolean,
  setIsModal: () => void,
}

export const useUserAdminStore = create<useUserAdminStore>((set) => ({
  isModal: false,
  setIsModal: () => set((state) => ({ isModal: !state.isModal}))

  //   bears: 0,
  //   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 }),
  //   updateBears: (newBears) => set({ bears: newBears }),
}));
