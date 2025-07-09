import { useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";

export function useRequestOtp() {
  const [loading, setLoading] = useState(false);

  const requestOtp = async (email: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.post("/auth/request-otp", { email });
      toast.success("OTP sent successfully!");
      console.log("OTP Response:", response.data);
      return true;
    } catch (error) {
      if (error?.status === 404) toast.error(error?.response?.data?.detail);
      else toast.error("Failed to send OTP. Please try again.");
      console.error("OTP Request Error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { requestOtp, loading };
}
