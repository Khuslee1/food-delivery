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
import { useContext } from "react";
import { StepContext } from "@/app/Login/page";
import { Jumper } from "./Jumper";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  Email: z
    .string()
    .email({ message: "Invalid email. Use a format like example@email.com." }),
  Password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .regex(/[A-Z]/, "Must contain one uppercase letter")
    .regex(/[a-z]/, "Must contain one lowercase letter")
    .regex(/[0-9]/, "Must contain one number")
    .regex(/[^A-Za-z0-9]/, "Must contain one special character"),
});
export const Login = () => {
  const { setStep } = useContext(StepContext);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    router.push("./");
  }
  return (
    <div className="w-104 flex flex-col gap-6">
      <Button
        className="w-9 h-9 flex items-center justify-center"
        type="button"
        variant="outline"
        disabled
      >
        <ChevronLeft />
      </Button>
      <Header h1T={"Log in"} pT={"Log in to enjoy your favorite dishes."} />
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
            <FormField
              control={form.control}
              name="Password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              className="text-[14px] underline"
              onClick={() => {
                setStep(2);
              }}
            >
              Forgot Password?
            </div>
          </div>
          <Button type="submit" className="w-full">
            Let's Go
          </Button>
          <Jumper value={"log"} />
        </form>
      </Form>
    </div>
  );
};
