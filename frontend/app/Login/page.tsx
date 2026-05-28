"use client";

import { Dispatch, SetStateAction, useState, createContext } from "react";
import { CreateNew } from "../_components/auth/CreateNew";
import { Login } from "../_components/auth/Login";
import { Forgot } from "../_components/auth/Forgot";
import { Verify } from "../_components/auth/Verify";

export type StepContextType = {
  setStep: Dispatch<SetStateAction<number>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

export const StepContext = createContext<StepContextType>(
  {} as StepContextType,
);

export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  return (
    <div className="w-screen min-h-screen flex flex-col lg:flex-row gap-10 p-6 lg:p-10 lg:pl-20 items-center justify-center lg:justify-between">
      <StepContext.Provider value={{ setStep, email, setEmail }}>
        {step == 1 ? (
          <Login />
        ) : step == 2 ? (
          <Forgot />
        ) : step == 3 ? (
          <Verify />
        ) : (
          <CreateNew />
        )}
        <img src="./LoginImg.png" className="hidden lg:block h-full max-h-screen object-contain" />
      </StepContext.Provider>
    </div>
  );
}
