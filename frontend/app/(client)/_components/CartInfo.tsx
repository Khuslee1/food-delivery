import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FoodInfo } from "./FoodInfo";
import { Textarea } from "@/components/ui/textarea";

import { HistoryCard } from "./HistoryCard";
import { Food, useCart } from "../context/cart-context";

export type foodType = Food & {
  quantity: number;
};
export type orderType = {
  food: foodType[];
};

export const CartInfo = () => {
  const { getTotalPrice, cartItems } = useCart();

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
                      placeholder="Please share your complete address"
                      className="mt-2 h-20"
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
                <Button className="w-full h-11 bg-red-500 text-white rounded-full mt-4">
                  Checkout
                </Button>
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
