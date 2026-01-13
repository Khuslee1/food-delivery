"use client";
import { useEffect, useState } from "react";
import { CataAdd, foodArr } from "../_components/CataAdd";
import { Profile } from "../_components/Profile";
import { ToggleCata } from "../_components/ToggleCata";
import { api } from "@/lib/axios";

import { Food } from "@/app/(client)/context/cart-context";
export type categorType = { name: string; _id: string };
export default function Home() {
  const [allState, setAllstate] = useState<boolean>(true);
  const [Category, setCategory] = useState<categorType[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await api.get("/categories");
      setCategory(data);
    };
    getData();
  }, []);

  useEffect(() => {
    const getDataFoods = async () => {
      const { data } = await api.get("/Foods");
      setFoods(data);
    };
    getDataFoods();
  }, []);
  const [categoriesWithFood, setCategoriesWithFood] = useState<foodArr[]>([]);
  const [orphan, setOrphan] = useState<foodArr>();

useEffect(() => {
  if (!foods || !Category) return;

  const merged: foodArr[] = Category.map((cat, index) => {
    const categoryId = cat?._id ?? `unknown-${index}`;
    const categoryName = cat?.name ?? "Uncategorized";

    return {
      name: categoryName,
      id: categoryId,
      state: false,
      food: foods
        .filter((food) =>
          cat?._id
            ? food?.categoryId?._id === cat._id
            : food?.categoryId == null
        )
        .map((food) => ({
          foodName: food.name,
          price: food.price,
          foodId: food._id,
          overview: food.ingredients,
          img: food.image,
        })),
    };
  });

  setCategoriesWithFood(merged);
}, [foods, Category]);

  return (
    <div className="w-full flex flex-col gap-10 bg-[#E4E4E7] px-7">
      <Profile />
      <div className="w-full flex flex-col gap-10 ">
        <ToggleCata
          mapData={categoriesWithFood}
          setMap={setCategoriesWithFood}
          setAllstate={setAllstate}
          allState={allState}
        />
        <CataAdd
          mapData={categoriesWithFood}
          setAllstate={setAllstate}
          allState={allState}
        />
      </div>
    </div>
  );
}
