import { create } from "zustand";

interface UserState {
  user: any;
  setUser: (user: any) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: any) => {
    set({ user: user });
  },
}));

export default useUserStore;
