import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { OTPForm } from "@/components/auth/otp-form";
import { useRequestOtp } from "@/hooks/useRequestOtp";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const { requestOtp, loading } = useRequestOtp();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await requestOtp(email);
    if (ok) setShowOtp(true);
  };

  return (
    <div className="min-w-full min-h-full bg-[url(/bg-image.jpg)]">
      <div className="flex min-h-svh items-center justify-center p-6 md:p-10">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card className="opacity-90">
            <CardHeader>
              <CardTitle className="text-center">
                {showOtp ? "OTP Verification" : "Login to your account"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showOtp ? (
                <OTPForm
                  email={email}
                  onSuccess={() => console.log("Redirect to dashboard")}
                />
              ) : (
                <form onSubmit={handleLogin} className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email" className="justify-center">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="someone@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Login"}
                  </Button>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a href="#" className="underline underline-offset-4">
                      Contact Admin
                    </a>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
