"use client";
import { ReactNode, useContext, useState } from "react";
import { foodType } from "../_components/CartInfo";
import { createContext } from "react";

interface CartContextType {
  cartItems: foodType[];
  addToCart: (item: foodType) => void;
  removeCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
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
  const [cartItems, setCartitems] = useState<foodType[]>([]);
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
