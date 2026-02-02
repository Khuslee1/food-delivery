"use client";
import { Toaster } from "sonner";
import { Footer } from "./_components/Footer";
import { HeaderMain } from "./_components/HeaderMain";
import { CartProvider } from "./context/cart-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <CartProvider>
        <Toaster />
        <HeaderMain />
        {children}
        <Footer />
      </CartProvider>
    </div>
  );
}
