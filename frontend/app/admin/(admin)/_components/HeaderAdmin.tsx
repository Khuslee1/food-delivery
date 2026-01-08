"use client";
import { Button } from "@/components/ui/button";

import { PanelsTopLeft, Truck } from "lucide-react";

import { usePathname, useRouter } from "next/navigation";

export const HeaderAdmin = () => {
  const router = useRouter();
  const params = usePathname();

  return (
    <div className="h-screen w-51.25 px-5 py-9 flex flex-col gap-10">
      <div className="flex gap-3 items-center">
        <img src="../logo.png" className="w-9 h-7.25" />{" "}
        <div>
          <h1 className="font-semibold text-5 text-black">NomNom</h1>
          <p className="text-[12px] text-black">Swift delivery</p>
        </div>
      </div>
      <div className="w-full rounded-full flex flex-col gap-6">
        {" "}
        <Button
          variant={params == "/admin/menu" ? "default" : "outline"}
          className="w-full rounded-full"
          onClick={() => {
            router.push("/admin/menu");
          }}
        >
          <PanelsTopLeft className="w-5.5 h-5.5" />
          <p>Food menu</p>
        </Button>
        <Button
          variant={params == "/admin" ? "default" : "outline"}
          className="w-full rounded-full"
          onClick={() => {
            router.push("/admin");
          }}
        >
          <Truck className="w-5.5 h-5.5" />
          <p>Orders</p>
        </Button>
      </div>
    </div>
  );
};
