"use client";

import { useEffect, useMemo, useState } from "react";
import { FoodCart } from "./FoodCart";
import { Food } from "../context/cart-context";
import { api } from "@/lib/axios";
import { foodType } from "./CartInfo";

export const Type = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [orderInfo, setOrder] = useState<foodType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await api.get("/foods");
      setFoods(data);
    };
    getData();
  }, []);

  useEffect(() => {
    if (foods.length > 0) {
      setOrder(
        foods.map((food) => ({
          ...food,
          quantity: 1,
        }))
      );
    }
  }, [foods]);

  const categories: string[] = useMemo(() => {
    return Array.from(new Set(orderInfo?.map((item) => item.categoryId?.name)));
  }, [orderInfo]);

  return (
    <>
      {categories.map((ele, i) => {
        return (
          <div
            key={ele}
            className="flex flex-col gap-10 items-center bg-[#404040] pt-12 pb-10"
          >
            <h1 className="w-316 text-[30px] text-white font-semibold">
              {ele}
            </h1>
            <div className="flex flex-wrap h-180 w-316 gap-9">
              {orderInfo.map((foodele, index) => {
                if (ele == foodele.categoryId.name)
                  return (
                    <FoodCart
                      key={index}
                      id={foodele._id}
                      setOrder={setOrder}
                      orderInfo={orderInfo}
                    />
                  );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};
