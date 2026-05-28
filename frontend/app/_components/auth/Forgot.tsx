"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Header } from "./Header";
import { useContext, useState } from "react";
import { StepContext } from "@/app/Login/page";
import { Jumper } from "./Jumper";

const formSchema = z.object({
  Email: z
    .string()
    .email({ message: "Invalid email. Use a format like example@email.com." }),
});

export const Forgot = () => {
  const { setStep, setEmail } = useContext(StepContext);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { Email: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.Email }),
      });
      const data = await res.json() as { message: string };
      if (!res.ok) {
        setError(data.message);
        return;
      }
      setEmail(values.Email);
      setStep(3);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-104 flex flex-col gap-6">
      <Button
        className="w-9 h-9 flex items-center justify-center"
        type="button"
        variant="outline"
        onClick={() => setStep(1)}
      >
        <ChevronLeft />
      </Button>
      <Header
        h1T={"Reset your password "}
        pT={"Enter your email to receive a password reset OTP."}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </Button>
          <Jumper value={"log"} />
        </form>
      </Form>
    </div>
  );
};
