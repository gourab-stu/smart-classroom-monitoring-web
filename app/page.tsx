"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster, toast } from "react-hot-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleEmailSubmit = async () => {
    if (!email) return toast.error("Please enter your email.");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("OTP sent to your email.");
        setShowOTPDialog(true);
      } else {
        toast.error("Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (!otp) return toast.error("Please enter the OTP.");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (data.verified) {
        toast.success("Verification successful!");
        router.push("/student/dashboard");
      } else {
        toast.error("Invalid OTP.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error during verification.");
    } finally {
      setLoading(false);
      setShowOTPDialog(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-cover bg-center relative flex items-center justify-center" style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

      <Card className="z-10 w-full max-w-md p-6 rounded-2xl bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow-xl">
        <CardContent className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">Sign In</h2>

          <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white dark:bg-gray-800" />

          <Button onClick={handleEmailSubmit} disabled={loading} className="w-full">
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Send OTP"}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showOTPDialog} onOpenChange={setShowOTPDialog}>
        <DialogContent className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-full max-w-sm">
          <h3 className="text-xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">Enter OTP</h3>
          <Input type="text" placeholder="6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="bg-white dark:bg-gray-800 mb-4" />
          <Button onClick={handleOtpSubmit} disabled={loading} className="w-full">
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Verify"}
          </Button>
        </DialogContent>
      </Dialog>

      <Toaster position="top-center" />
    </div>
  );
}
