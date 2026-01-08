"use client";

import { Dispatch, SetStateAction, useState, createContext } from "react";
import { CreateNew } from "../_components/auth/CreateNew";
import { Login } from "../_components/auth/Login";
import { Forgot } from "../_components/auth/Forgot";
import { Verify } from "../_components/auth/Verify";

export type StepContextType = {
  setStep: Dispatch<SetStateAction<number>>;
};

export const StepContext = createContext<StepContextType>(
  {} as StepContextType
);

export default function Home() {
  const [step, setStep] = useState<number>(1);
  return (
    <div className="w-screen h-screen flex gap-10 p-10 pl-20 items-center justify-between">
      <StepContext.Provider value={{ setStep }}>
        {step == 1 ? (
          <Login />
        ) : step == 2 ? (
          <Forgot />
        ) : step == 3 ? (
          <Verify />
        ) : (
          <CreateNew />
        )}
        <img src="./LoginImg.png" className="h-full" />
      </StepContext.Provider>
    </div>
  );
}
