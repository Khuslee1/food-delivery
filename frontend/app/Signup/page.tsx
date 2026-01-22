"use client";

import { Dispatch, SetStateAction, useState, createContext } from "react";
import { CreateAcc } from "../_components/auth/CreateAcc";
import { CreateNewPass } from "../_components/auth/CreateNewPass";

export type StepContextType = {
  setStep: Dispatch<SetStateAction<number>>;
  setData: Dispatch<
    SetStateAction<{
      username: string;
      password: string;
    } | null>
  >;
};

export const StepContext = createContext<StepContextType>(
  {} as StepContextType,
);

export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<{
    username: string;
    password: string;
  } | null>(null);

  return (
    <div className="w-screen h-screen flex gap-10 p-10 pl-20 items-center justify-between">
      <StepContext.Provider value={{ setStep, setData }}>
        {step == 1 ? <CreateAcc /> : <CreateNewPass />}
        <img src="./LoginImg.png" className="h-full" />
      </StepContext.Provider>
    </div>
  );
}
