import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FoodInfo } from "./FoodInfo";
import { Textarea } from "@/components/ui/textarea";

import { HistoryCard } from "./HistoryCard";
import { Food, useCart } from "../context/cart-context";
import { api } from "@/lib/axios";
import { useAuth } from "../context/AuthProvider";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export type foodType = Food & {
  quantity: number;
};
export type orderType = {
  food: foodType[];
};

export const CartInfo = () => {
  const { getTotalPrice, cartItems, deleteAll } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState<string | undefined>(user?.address);
  const updateAddress = async (add: string | undefined) => {
    await api.put("/auth/address", { address: add });
  };
  const postOrder = async () => {
    await api.post("/order", {
      orderItems: cartItems.map((item: foodType) => ({
        foodId: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      address: address,
    });
    deleteAll();
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="cart" className=" flex flex-col gap-6">
        <TabsList className="w-full rounded-full h-11">
          <TabsTrigger
            value="cart"
            className="rounded-full data-[state=active]:bg-red-500 data-[state=active]:text-white text-[18px]"
          >
            Cart
          </TabsTrigger>
          <TabsTrigger
            value="order"
            className="rounded-full data-[state=active]:bg-red-500 data-[state=active]:text-white text-[18px]"
          >
            Order
          </TabsTrigger>
        </TabsList>
        <TabsContent value="cart" className="w-full">
          <Card>
            <CardHeader>
              <CardTitle className="text-[20px] text-[#71717A]">
                My cart
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 min-h-102.5">
              {cartItems.length == 0 ? (
                <div className="w-full h-fit bg-[#F4F4F5] rounded-xl flex flex-col px-12 py-8 justify-center items-center gap-1">
                  <img src="../logo.png" height={"50px"} width={"61px"} />
                  <h1 className="text-[16px] font-bold">
                    Your cart is empthy{" "}
                  </h1>
                  <p className="font-normal text-[12px] text-[#71717A] text-center">
                    Hungry? 🍔 Add some delicious dishes to your cart and
                    satisfy your cravings!
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <div className="max-h-67.5 overflow-auto flex flex-col gap-5">
                    {" "}
                    <FoodInfo />
                  </div>

                  <div className="mt-5">
                    <h1 className="text-[#71717A] text-5 font-semibold">
                      Delivary location
                    </h1>
                    <Textarea
                      defaultValue={address}
                      placeholder="Please share your complete address"
                      className="mt-2 h-20"
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setAddress(e.target.value)
                      }
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="mt-5">
            <CardHeader>
              <CardTitle className="text-[20px] text-[#71717A]">
                Payment info
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div>
                <p className="w-full text-4 text-[#71717A] flex justify-between mb-1">
                  Items
                  <span className="font-bold text-black">
                    {cartItems.length != 0
                      ? "$" + getTotalPrice().toFixed(2)
                      : "-"}
                  </span>
                </p>
                <p className="w-full text-4 text-[#71717A] flex justify-between mb-4">
                  Shipping
                  <span className="font-bold  text-black">
                    {cartItems.length != 0 ? 0.99 + "$" : "-"}
                  </span>
                </p>
                <p className="w-full text-4 text-[#71717A] flex justify-between pt-4 border-t-2 border-dashed border-t-[71717A]">
                  Total
                  <span className="font-bold  text-black">
                    {cartItems.length != 0
                      ? "$" + (getTotalPrice() + 0.99).toFixed(2)
                      : "-"}
                  </span>
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="w-full h-11 bg-red-500 text-white rounded-full mt-4"
                      disabled={cartItems.length === 0}
                      onClick={async () => {
                        if (cartItems.length > 0) {
                          await updateAddress(address);
                          await postOrder();
                        }
                      }}
                    >
                      Checkout
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="flex flex-col items-center justify-center">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-semibold text-[24px]">
                        Your order has been successfully placed!
                      </AlertDialogTitle>
                      <AlertDialogDescription className="flex items-center justify-center w-full">
                        <img
                          src="/illustration.png"
                          className="w-39 h-[265.7px]"
                          alt="Order success"
                        />
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogAction
                        variant="outline"
                        className="rounded-3xl"
                      >
                        Back to Home
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="order" className="w-full max-h-full ">
          <HistoryCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};
