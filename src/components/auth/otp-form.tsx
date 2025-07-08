import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useOtp } from "@/hooks/useOtp";

type Props = {
  email: string;
  onSuccess: () => void;
};

export function OTPForm({ email, onSuccess }: Props) {
  const {
    otp,
    setOtp,
    loading,
    verifying,
    timeLeft,
    formatTime,
    requestOtp,
    verifyOtp,
  } = useOtp(email);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6"
    >
      <div className="text-center">
        <h2 className="text-lg font-semibold">Enter the OTP</h2>
        <p className="text-sm text-muted-foreground">
          Sent to: <strong>{email}</strong>
        </p>
        <p className="text-sm mt-1">
          OTP will expire in{" "}
          <span className="font-semibold">{formatTime(timeLeft)}</span>
        </p>
      </div>

      <div className="flex justify-center">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={setOtp}
          disabled={verifying}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button
        className="w-full"
        onClick={() => verifyOtp(onSuccess)}
        disabled={verifying || otp.length !== 6}
      >
        {verifying ? "Verifying..." : "Verify"}
      </Button>

      <Button
        variant="link"
        onClick={requestOtp}
        disabled={timeLeft > 0 || loading}
      >
        {loading ? "Resending..." : "Resend OTP"}
      </Button>
    </motion.div>
  );
}
