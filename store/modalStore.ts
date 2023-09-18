import { create } from "zustand";

interface modalState {
  modalOpen: boolean;
  setModalOpen: (argument: boolean) => void;
}

const useModalStore = create<modalState>((set) => ({
  modalOpen: false,
  setModalOpen: (argument) => {
    set({ modalOpen: argument });
  },
}));

export default useModalStore;
