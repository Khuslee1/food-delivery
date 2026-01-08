"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Check, Minus, Plus } from "lucide-react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useCart } from "../context/cart-context";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { foodType } from "./CartInfo";
export type Props = {
  id: string;
  setOrder: Dispatch<SetStateAction<foodType[]>>;
  orderInfo: foodType[];
};

export const FoodCart = (props: Props) => {
  const { addToCart, removeCart, cartItems, updateQuantity } = useCart();
  const isCarted = !cartItems.some((item) => item._id === props.id);
  useEffect(() => {
    props.setOrder((prev) =>
      prev.map((item) =>
        item._id === props.id ? { ...item, quantity: item.quantity } : item
      )
    );
  }, [cartItems]);
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="relative">
      <Dialog>
        <DialogTrigger>
          <div>
            <Card className="p-4 w-99.25 h-85.5 gap-1.25">
              <CardHeader className="p-0">
                <img
                  className="w-full h-52.5 rounded-xl"
                  src={
                    props.orderInfo.filter((ele) => ele._id == props.id)[0]
                      .image
                  }
                />
              </CardHeader>
              <CardFooter className="p-0 flex-col">
                <p className="text-[#EF4444] text-[24px] font-semibold w-full flex justify-between">
                  {props.orderInfo.filter((ele) => ele._id == props.id)[0].name}
                  <span className="text-black text-[18px]">
                    $
                    {
                      props.orderInfo.filter((ele) => ele._id == props.id)[0]
                        .price
                    }
                  </span>
                </p>
                <p className="text-[14px] text-start">
                  {
                    props.orderInfo.filter((ele) => ele._id == props.id)[0]
                      .ingredients
                  }
                </p>
              </CardFooter>
            </Card>
          </div>
        </DialogTrigger>
        <DialogContent className="min-w-206.5" showCloseButton={false}>
          <DialogTitle className="hidden" />
          <DialogHeader className="flex-row gap-6 min-w-200 ">
            <img
              className="w-[46.7%] h-91"
              src={
                props.orderInfo.filter((ele) => ele._id == props.id)[0].image
              }
            />
            <div className="w-[46.7%] h-91 flex flex-col justify-between">
              <div>
                <div className="w-full flex justify-end">
                  <DialogClose asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full"
                    >
                      {" "}
                      <X className="text-black" />
                    </Button>
                  </DialogClose>
                </div>
                <div className="w-full flex justify-end"></div>
                <p className="text-[#EF4444] text-[30px] font-semibold w-full flex justify-between">
                  {props.orderInfo.filter((ele) => ele._id == props.id)[0].name}
                </p>
                <p className="text-[16px] text-start pt-3">
                  {
                    props.orderInfo.filter((ele) => ele._id == props.id)[0]
                      .ingredients
                  }
                </p>
              </div>
              <div className="flex flex-col gap-6 w-full">
                <div className="flex justify-between">
                  <p className="text-4 flex flex-col">
                    Total price
                    <span className="font-semibold text-[24px]">
                      $
                      {(
                        props.orderInfo.filter((ele) => ele._id == props.id)[0]
                          .price * quantity
                      ).toFixed(2)}
                    </span>
                  </p>
                  <div className="flex gap-3 items-center">
                    <Button
                      size="icon"
                      variant={"outline"}
                      disabled={quantity == 1}
                      className="rounded-full"
                      onClick={() => {
                        setQuantity(quantity - 1);
                      }}
                    >
                      <Minus />
                    </Button>
                    <p>{quantity}</p>
                    <Button
                      size="icon"
                      variant={"outline"}
                      className="rounded-full"
                      onClick={() => {
                        setQuantity(quantity + 1);
                      }}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
                <DialogClose asChild>
                  <Button
                    className="rounded-full"
                    onClick={() => {
                      addToCart(
                        props.orderInfo.filter((ele) => ele._id == props.id)[0]
                      );
                      updateQuantity(props.id, quantity);
                      setQuantity(1);
                    }}
                  >
                    {" "}
                    Add to cart
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Button
        size="icon"
        className={`rounded-full absolute w-11 h-11 bottom-32 right-8 ${
          isCarted ? "bg-white" : "bg-[#18181B]"
        }`}
        onClick={() => {
          isCarted
            ? addToCart(props.orderInfo.filter((ele) => ele._id == props.id)[0])
            : removeCart(props.id);
        }}
      >
        {isCarted ? (
          <Plus className="w-4 h-4 text-[#EF4444]" />
        ) : (
          <Check className="w-4 h-4 text-[#E4E4E7]" />
        )}
      </Button>
    </div>
  );
};
