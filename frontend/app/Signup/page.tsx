"use client";

import {
  Dispatch,
  SetStateAction,
  useState,
  createContext,
  useEffect,
} from "react";
import { CreateAcc } from "../_components/auth/CreateAcc";
import { CreateNewPass } from "../_components/auth/CreateNewPass";
import { useAuth } from "../(client)/context/AuthProvider";

export type StepContextType = {
  setStep: Dispatch<SetStateAction<number>>;
  setData: Dispatch<
    SetStateAction<{
      email: string;
    }>
  >;
  data: { email: string };
};

export const StepContext = createContext<StepContextType>(
  {} as StepContextType,
);

export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<{
    email: string;
  }>({
    email: "",
  });
  const { register } = useAuth();

  return (
    <div className="w-screen h-screen flex gap-10 p-10 pl-20 items-center justify-between">
      <StepContext.Provider value={{ setStep, setData, data }}>
        {step == 1 ? <CreateAcc /> : <CreateNewPass />}
        <img src="./LoginImg.png" className="h-full" />
      </StepContext.Provider>
    </div>
  );
}
