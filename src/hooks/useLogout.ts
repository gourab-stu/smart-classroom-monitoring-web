import { useState } from "react";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";

export function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const clearAccessToken = useAuthStore((state) => state.clearAuth);

  const logout = async () => {
    setIsLoading(true);
    try {
      await api.post("/auth/logout");
      clearAccessToken();
      toast.success("Logged out successfully");
      window.location.reload(); // or redirect if needed
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading };
}
