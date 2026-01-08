"use client";
import { Button } from "@/components/ui/button";
import { MapPin, ShoppingCart, User, X } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CartInfo } from "./CartInfo";

import { type DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/cart-context";
type Checked = DropdownMenuCheckboxItemProps["checked"];

export const HeaderMain = () => {
  const [log, setLog] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div className="w-screen h-17 bg-[#18181B] flex px-22 items-center justify-between fixed top-0 right-0 left-0 z-2">
      <div className="flex gap-3">
        <img src="../logo.png" height={"37px"} width={"46px"} />{" "}
        <div>
          <h1 className="font-semibold text-5 text-white">
            Nom<span className="text-[#EF4444]">Nom</span>
          </h1>
          <p className="text-[12px] text-white">Swift delivery</p>
        </div>
      </div>
      <div className="flex gap-3">
        {!log ? (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button className=" bg-white rounded-full">
                  <MapPin className="text-[#EF4444]" />
                  <p className="text-[#EF4444]">
                    Delivery address:{" "}
                    <span className="text-[#71717A]">Add Location</span>
                  </p>
                  <ChevronRight className="text-[#71717A]" />
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-106.25 flex flex-col gap-8"
                showCloseButton={false}
              >
                <DialogHeader>
                  <DialogClose>
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full absolute right-6"
                    >
                      {" "}
                      <X className="text-black" />
                    </Button>
                  </DialogClose>
                  <DialogTitle>Please write your delivery address!</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Textarea
                      placeholder="Please share your complete address"
                      className="h-20"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Deliver Here</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <Button
                  size="icon"
                  variant={"secondary"}
                  className=" bg-white rounded-full text-black"
                >
                  <ShoppingCart />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="rounded-4xl bg-[#404040] border-l-[#404040] min-w-133.75 h-256 p-6">
                <DrawerHeader>
                  <DrawerTitle className="flex gap-2 mb-6">
                    <ShoppingCart className="text-white w-6 h-6 font-bold" />
                    <p className=" text-white text-5 font-semibold">
                      {" "}
                      Order detail
                    </p>
                    <DrawerClose asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full absolute right-12 top-10"
                      >
                        {" "}
                        <X className="text-black" />
                      </Button>
                    </DrawerClose>
                  </DrawerTitle>
                  <CartInfo />
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant={"destructive"}
                  className=" bg-[#EF4444] rounded-full"
                >
                  <User />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="flex flex-col gap-2 items-center p-4 rounded-xl">
                  <p className="text-[20px] font-bold.  ">Test@gmail.com</p>
                  <Button
                    variant="outline"
                    className=" bg-[#F4F4F5] w-20 rounded-full"
                    onClick={() => {
                      setLog(!log);
                    }}
                  >
                    Sign out
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>{" "}
          </>
        ) : (
          <>
            <Button
              variant={"outline"}
              className="bg-white rounded-full"
              onClick={() => {
                router.push("./Signup");
                setLog(!log);
              }}
            >
              Sign up
            </Button>
            <Button
              variant={"outline"}
              className="bg-red-500 border-0 text-white rounded-full"
              onClick={() => {
                router.push("./Login");
                setLog(!log);
              }}
            >
              Log in
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
