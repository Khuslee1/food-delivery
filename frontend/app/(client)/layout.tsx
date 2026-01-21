"use client";
import { Footer } from "./_components/Footer";
import { HeaderMain } from "./_components/HeaderMain";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/cart-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthProvider>
        <CartProvider>
          <HeaderMain />
          {children}
          <Footer />
        </CartProvider>
      </AuthProvider>
    </div>
  );
}
