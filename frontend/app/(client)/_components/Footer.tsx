"use client";
import { Instagram, LucideFacebook } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Food, useCart } from "../context/cart-context";
import { api } from "@/lib/axios";
import { foodType } from "./CartInfo";
export type category = { name: string; _id: string };

export const Footer = () => {
  const router = useRouter();
  const nomnom: string[] = ["Home", "Contact us", "Delivery zone"];
  const [category, setCategory] = useState<category[]>([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await api.get("/categories");
      setCategory(data);
    };
    getData();
  }, []);

  const bottom: string[] = [
    "Copy right 2024 © Nomnom LLC",
    "Privacy policy  ",
    "Terms and conditoin",
    "Cookie policy",
  ];

  return (
    <div className="w-full h-188.75 bg-[#18181B] flex flex-col items-center justify-around overflow-hidden ">
      <div className="w-full h-23 bg-[#EF4444]  overflow-hidden flex items-center">
        <div className="animate-[marquee_15s_linear_infinite] flex items-center gap-8.5">
          <h1 className="font-semibold text-[30px] text-white">
            Fresh fast delivered{" "}
          </h1>
          <h1 className="font-semibold text-[30px] text-white">
            Fresh fast delivered{" "}
          </h1>
          <h1 className="font-semibold text-[30px] text-white">
            Fresh fast delivered{" "}
          </h1>
          <h1 className="font-semibold text-[30px] text-white">
            Fresh fast delivered{" "}
          </h1>
          <h1 className="font-semibold text-[30px] text-white">
            Fresh fast delivered{" "}
          </h1>
        </div>
      </div>
      <div className="w-316 h-104 flex flex-col justify-between">
        <div className="w-full h-57 flex gap-55">
          <div className="flex gap-3 flex-col items-center min-w-fit">
            <img src="../logo.png" height={"37px"} width={"46px"} />{" "}
            <div>
              <h1 className="font-semibold text-5 text-white">
                Nom<span className="text-[#EF4444]">Nom</span>
              </h1>
              <p className="text-[12px] text-white">Swift delivery</p>
            </div>
          </div>{" "}
          <div className="flex gap-28 min-w-fit">
            <div className="flex flex-col gap-1">
              {" "}
              <h1 className="font-normal text-4 text-[#71717A]">NOMNOM</h1>
              {nomnom.map((ele, inde) => {
                return (
                  <p key={inde} className="text-4 text-white">
                    {ele}
                  </p>
                );
              })}
            </div>
            <div className="flex flex-col gap-1">
              {" "}
              <h1 className="font-normal text-4 text-[#71717A]">MENU</h1>
              {category.map((ele, ind) => {
                return (
                  <p
                    key={ind}
                    className="text-4 text-white"
                    onClick={() => {
                      router.push(`/Cata/${ele.name}`);
                    }}
                  >
                    {ele.name}
                  </p>
                );
              })}
            </div>

            <div className="flex flex-col gap-1">
              {" "}
              <h1 className="font-normal text-4 text-[#71717A]">FOLLOW US</h1>
              <div className="flex gap-4 text-white">
                {" "}
                <Instagram />
                <LucideFacebook />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-21 border-t border-t-[#F4F4F566] items-center gap-12 flex">
          {bottom.map((ele, il) => {
            return (
              <p key={il} className="tex-[14px] text-[#71717A]">
                {ele}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};
