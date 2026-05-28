"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { Header } from "./Header";
import { StepContext } from "@/app/Login/page";
import { useContext, useState } from "react";

export const Verify = () => {
  const { setStep, email, setEmail } = useContext(StepContext);
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [resending, setResending] = useState<boolean>(false);

  const handleVerify = async () => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json() as { message: string };
      if (!res.ok) {
        setError(data.message);
        return;
      }
      setStep(4);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setResending(true);
    try {
      const res = await fetch("${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json() as { message: string };
      if (!res.ok) {
        setError(data.message);
      }
    } catch {
      setError("Could not resend. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="w-104 flex flex-col gap-6">
      <Button
        className="w-9 h-9 flex items-center justify-center"
        type="button"
        variant="outline"
        onClick={() => setStep(2)}
      >
        <ChevronLeft />
      </Button>
      <Header
        h1T={"Check your email"}
        pT={`We sent a 6-digit OTP to ${email}. Enter it below to continue.`}
      />
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button onClick={handleVerify} disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleResend}
          disabled={resending}
        >
          {resending ? "Resending..." : "Resend OTP"}
        </Button>
      </div>
    </div>
  );
};
