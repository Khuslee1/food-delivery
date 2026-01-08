"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { foodType, orderType } from "../_components/CartInfo";
import { createContext } from "react";
import { api } from "@/lib/axios";

interface CartContextType {
  cartItems: foodType[];
  addToCart: (item: foodType) => void;
  removeCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  // orderInfo: orderType;
  // setOrder: Dispatch<SetStateAction<orderType>>;
}
export type Food = {
  _id: string;
  name: string;
  price: number;
  image: string;
  ingredients: string;
  categoryId: { _id: string; name: string };
};
const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await api.get("/foods");
  //     setFoods(data);
  //   };
  //   getData();
  // }, []);
  const [cartItems, setCartitems] = useState<foodType[]>([]);
  // const [foods, setFoods] = useState<Food[]>([]);
  // const [orderInfo, setOrder] = useState<foodType[]>();

  // const [orderInfo, setOrder] = useState<orderType>({
  //   food: [
  //     {
  //       id: 0,
  //       type: "Appetizers",
  //       name: "Sunshine Stackers",
  //       overview:
  //         "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  //       quantity: 1,
  //       price: 12.99,
  //     },
  //     {
  //       id: 1,
  //       name: "Sunshine Stackers",
  //       type: "Appetizers",
  //       overview:
  //         "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  //       quantity: 1,
  //       price: 12.99,
  //     },
  //     {
  //       id: 2,
  //       type: "Appetizers",
  //       name: "Sunshine Stackers",
  //       overview:
  //         "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  //       quantity: 1,
  //       price: 12.99,
  //     },
  //     {
  //       id: 3,
  //       name: "Sunshine Stackers",
  //       type: "Appetizers",
  //       overview:
  //         "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  //       quantity: 1,
  //       price: 12.99,
  //     },
  //     {
  //       id: 4,
  //       type: "Appetizers",
  //       name: "Sunshine Stackers",
  //       overview:
  //         "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  //       quantity: 1,
  //       price: 12.99,
  //     },
  //     {
  //       id: 5,
  //       name: "Sunshine Stackers",
  //       type: "Appetizers",
  //       overview:
  //         "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  //       quantity: 1,
  //       price: 12.99,
  //     },
  //     {
  //       id: 6,
  //       type: "Salads",
  //       name: "Sunshine Stackers",
  //       overview:
  //         "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  //       quantity: 1,
  //       price: 12.99,
  //     },
  //     {
  //       id: 7,
  //       type: "Salads",
  //       name: "Sunshine Stackers",
  //       overview:
  //         "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  //       quantity: 1,
  //       price: 12.99,
  //     },
  //     {
  //       id: 8,
  //       type: "Salads",
  //       name: "Sunshine Stackers",
  //       overview:
  //         "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  //       quantity: 1,
  //       price: 12.99,
  //     },
  //     {
  //       id: 9,
  //       type: "Salads",
  //       name: "Sunshine Stackers",
  //       overview:
  //         "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  //       quantity: 1,
  //       price: 12.99,
  //     },
  //     {
  //       id: 10,
  //       type: "Salads",
  //       name: "Sunshine Stackers",
  //       overview:
  //         "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  //       quantity: 1,
  //       price: 12.99,
  //     },
  //     {
  //       id: 11,
  //       type: "Salads",
  //       name: "Sunshine Stackers",
  //       overview:
  //         "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  //       quantity: 1,
  //       price: 12.99,
  //     },
  //     {
  //       id: 12,
  //       type: "Lunch favorites",
  //       name: "Sunshine Stackers",
  //       overview:
  //         "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  //       quantity: 1,
  //       price: 12.99,
  //     },
  //     {
  //       id: 13,
  //       type: "Lunch favorites",
  //       name: "Sunshine Stackers",
  //       overview:
  //         "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  //       quantity: 1,
  //       price: 12.99,
  //     },
  //     {
  //       id: 14,
  //       type: "Lunch favorites",
  //       name: "Sunshine Stackers",
  //       overview:
  //         "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  //       quantity: 1,
  //       price: 12.99,
  //     },
  //     {
  //       id: 15,
  //       type: "Lunch favorites",
  //       name: "Sunshine Stackers",
  //       overview:
  //         "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  //       quantity: 1,
  //       price: 12.99,
  //     },
  //     {
  //       id: 16,
  //       type: "Lunch favorites",
  //       name: "Sunshine Stackers",
  //       overview:
  //         "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  //       quantity: 1,
  //       price: 12.99,
  //     },
  //     {
  //       id: 17,
  //       type: "Lunch favorites",
  //       name: "Sunshine Stackers",
  //       overview:
  //         "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  //       quantity: 1,
  //       price: 12.99,
  //     },
  //   ],
  //   location: "mangasiin amnii zuun tald bubuchin podwol",
  // });
  // const foodsWithQuantity: foodType[] = foods.map((food: Food) => ({
  //   ...food,
  //   quantity: 1,
  // }));

  // setOrder(foodsWithQuantity);

  const addToCart = (item: foodType) => {
    setCartitems((prev) => {
      const exists = prev.find((ele) => ele._id === item._id);
      if (exists) {
        return prev.map((ele) =>
          ele._id === item._id
            ? { ...ele, quantity: ele.quantity + item.quantity }
            : ele
        );
      }
      return [...prev, item];
    });
  };
  const removeCart = (id: string) => {
    setCartitems((prev) => prev.filter((ele) => ele._id !== id));
  };
  const updateQuantity = (id: string, quantity: number) => {
    setCartitems((prev) =>
      prev.map((ele) => (ele._id == id ? { ...ele, quantity: quantity } : ele))
    );
  };
  const getTotalItems = () => {
    return cartItems.reduce((sum, ele) => sum + ele.quantity, 0);
  };
  const getTotalPrice = () => {
    return cartItems.reduce((sum, ele) => sum + ele.price * ele.quantity, 0);
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeCart,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
