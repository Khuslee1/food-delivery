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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { StepContext } from "@/app/Login/page";

const formSchema = z
  .object({
    Password: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .regex(/[A-Z]/, "Must contain one uppercase letter")
      .regex(/[a-z]/, "Must contain one lowercase letter")
      .regex(/[0-9]/, "Must contain one number")
      .regex(/[^A-Za-z0-9]/, "Must contain one special character"),
    ConfirmPassword: z.string(),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "Passwords do not match",
    path: ["ConfirmPassword"],
  });
export const CreateNew = () => {
  const { setStep } = useContext(StepContext);
  const [see, setSee] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Password: "",
      ConfirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="w-104 flex flex-col gap-6">
      <Button
        className="w-9 h-9 flex items-center justify-center"
        type="button"
        variant="outline"
        onClick={() => setStep(3)}
      >
        <ChevronLeft />
      </Button>
      <Header
        h1T={"Create new password"}
        pT={
          "Set a new password with a combination of letters and numbers for better security."
        }
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="Password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type={!see ? "password" : "text"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ConfirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Confirm"
                      type={!see ? "password" : "text"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <Checkbox
                className="h-4 w-4 border border-[#09090B80] rounded-m"
                id="toggle"
                checked={see}
                onCheckedChange={(value) => {
                  setSee(!!value);
                }}
              />
              <Label className="font-normal text-[#71717A]">
                Show Password
              </Label>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Create Password
          </Button>
        </form>
      </Form>
    </div>
  );
};
