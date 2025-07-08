import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth";

export function useOtp(email: string) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Request OTP
  const requestOtp = async (): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await api.post("/auth/request-otp", { email });
      toast.success("OTP sent successfully");
      setTimeLeft(300); // reset timer
      return true;
    } catch (err) {
      toast.error("Failed to send OTP");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOtp = async (
    onSuccess: (accessToken: string) => void
  ): Promise<void> => {
    setVerifying(true);
    try {
      const res = await api.post("/auth/verify-otp", { email, otp });

      const token = res.data?.content?.access_token;
      const role = res.data?.content?.role; // or user?.role

      if (token) {
        useAuthStore.getState().setAccessToken(token);
        if (role) useAuthStore.getState().setUserRole(role);
        toast.success("OTP Verified Successfully");
        onSuccess(token);
      } else {
        toast.error("No access token received");
      }
    } catch (err) {
      toast.error("OTP verification failed");
    } finally {
      setVerifying(false);
    }
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return {
    otp,
    setOtp,
    loading,
    verifying,
    timeLeft,
    formatTime,
    requestOtp,
    verifyOtp,
  };
}
