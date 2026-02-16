import { create } from 'zustand';

type AppStore = {
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
};

export const useAppStore = create<AppStore>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
