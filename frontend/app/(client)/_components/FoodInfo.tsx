"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "../context/cart-context";

export const FoodInfo = () => {
  const { cartItems, removeCart, updateQuantity } = useCart();

  return cartItems.map((ele, i) => {
    return (
      <div key={i} className="flex gap-2.5 w-full ">
        <img src={ele.image} className="h-30 w-30 rounded-2xl" />

        <div className="flex flex-col justify-between w-70 h-full">
          <div className="flex justify-between">
            <h1 className="flex flex-col text-[#EF4444] text-4 font-bold">
              {ele.name}
              <span className="text-black text-[12px] font-normal">
                {ele.ingredients}
              </span>
            </h1>
            <Button
              size="icon"
              className="rounded-full border-red-500"
              variant={"outline"}
              onClick={() => {
                removeCart(ele._id);
              }}
            >
              <X className="text-red-500" />
            </Button>
          </div>
          <div className="flex justify-between w-full">
            {" "}
            <div className="flex gap-3 items-center">
              <Button
                size="icon"
                variant={"outline"}
                disabled={ele.quantity == 1}
                className="rounded-full"
                onClick={() => {
                  updateQuantity(ele._id, ele.quantity - 1);
                }}
              >
                <Minus />
              </Button>
              <p>{ele.quantity}</p>
              <Button
                size="icon"
                variant={"outline"}
                className="rounded-full"
                onClick={() => {
                  updateQuantity(ele._id, ele.quantity + 1);
                }}
              >
                <Plus />
              </Button>
            </div>
            <h1>{(ele.price * ele.quantity).toFixed(2)}$</h1>
          </div>
        </div>
      </div>
    );
  });
};
