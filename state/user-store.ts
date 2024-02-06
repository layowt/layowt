import { create } from 'zustand';

interface UserStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  userEmail: string;
  setUserEmail: (userEmail: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  userEmail: '',
  setUserEmail: (userEmail: string) => set({ userEmail }),
}));
