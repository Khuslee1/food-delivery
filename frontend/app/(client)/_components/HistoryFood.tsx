"use client";
import { Map, Soup, Timer } from "lucide-react";
type hurgeltType = {
  hurgelt: boolean;
};

export const HistoryFood = ({ hurgelt }: hurgeltType) => {
  return (
    <>
      <h1 className="w-full flex justify-between text-[16px] font-bold items-center mt-2 ">
        Price$ (#ID){" "}
        {!hurgelt ? (
          <span className="border border-red-500 rounded-full flex items-center text-[12px] justify-center px-2.5 py-1">
            Pending
          </span>
        ) : (
          <span className="bg-[#F4F4F5] rounded-full flex items-center text-[12px] justify-center px-2.5 py-1">
            Delivered
          </span>
        )}
      </h1>
      <div className="w-full flex justify-between ">
        <p className="flex gap-1 text-[12px] font-normal text-[#71717A]">
          {" "}
          <Soup height={"16px"} width={"16px"} />
          Sunshine Stackers{" "}
        </p>
        <p className="text-[12px]">x 1</p>
      </div>
      <p className="w-full flex gap-1 text-[12px] font-normal text-[#71717A]">
        <Timer height={"16px"} width={"16px"} /> Date
      </p>{" "}
      <p className="w-full flex gap-1 text-[12px] font-normal text-[#71717A] pb-2 border-b border-b-[71717A] border-dashed">
        <Map height={"16px"} width={"16px"} /> location
      </p>
    </>
  );
};
