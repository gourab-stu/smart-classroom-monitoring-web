import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  userRole: string | null;
  setAccessToken: (token: string) => void;
  setUserRole: (role: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("access_token"),
  userRole: localStorage.getItem("user_role"),
  setAccessToken: (token) => {
    localStorage.setItem("access_token", token);
    set({ accessToken: token });
  },
  setUserRole: (role) => {
    localStorage.setItem("user_role", role);
    set({ userRole: role });
  },
  clearAuth: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    set({ accessToken: null, userRole: null });
  },
}));
