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
import { StepContext } from "@/app/Signup/page";
import { Jumper } from "./Jumper";

const formSchema = z.object({
  Email: z
    .string()
    .email({ message: "Invalid email. Use a format like example@email.com." }),
});
export const CreateAcc = () => {
  const { setStep } = useContext(StepContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setStep(2);
  }
  return (
    <div className="w-104 flex flex-col gap-6">
      <Button
        className="w-9 h-9 flex items-center justify-center"
        type="button"
        variant="outline"
        // onClick={() => setStep(1)}
        disabled
      >
        <ChevronLeft />
      </Button>
      <Header
        h1T={"Create your account"}
        pT={"Sign up to explore your favorite dishes."}
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
          </div>
          <Button type="submit" className="w-full">
            Let's Go
          </Button>
          {/* <p className="text-[#71717A] w-full flex gap-3 justify-center">
            Already have an account?
            <span className="text-[#2563EB]">Log in</span>
          </p> */}
          <Jumper value={"sign"} />
        </form>
      </Form>
    </div>
  );
};
