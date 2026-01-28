"use client";
import { Map, Soup, Timer } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Food } from "../context/cart-context";
type OrderArrType = {
  foodId: Food;
  quantity: number;
  price: number;
};

type OrderHisType = {
  _id: string;
  userId: string;
  orderItems: OrderArrType[];
  status: string;
  address: string;
  createdAt: string;
};

export const HistoryFood = () => {
  const { user } = useAuth();
  const [orderArr, setOrderarr] = useState<OrderHisType[] | undefined>();

  useEffect(() => {
    const getOrderHis = async () => {
      const { data } = await api.get("/order", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setOrderarr(data);
      console.log(data);
    };

    getOrderHis();
  }, []);

  return (
    <div>
      {orderArr?.map((order) => (
        <div key={order._id} className="mb-4">
          <h1 className="w-full flex justify-between text-[16px] font-bold items-center mt-2">
            {order.orderItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0,
            )}
            $ (#{order._id})
            <span className="border border-red-500 rounded-full flex items-center text-[12px] justify-center px-2.5 py-1">
              {order.status}
            </span>
          </h1>

          {order.orderItems.map((ele, i) => (
            <div key={i} className="w-full flex justify-between">
              <p className="flex gap-1 text-[12px] font-normal text-[#71717A]">
                <Soup height="16px" width="16px" />
                {ele.foodId.name}
              </p>
              <p className="text-[12px]">x {ele.quantity}</p>
            </div>
          ))}

          <p className="w-full flex gap-1 text-[12px] font-normal text-[#71717A]">
            <Timer height="16px" width="16px" /> {order.createdAt}
          </p>

          <p className="w-full flex gap-1 text-[12px] font-normal text-[#71717A] pb-2 border-b border-dashed">
            <Map height="16px" width="16px" /> {order.address}
          </p>
        </div>
      ))}
    </div>
  );
};
