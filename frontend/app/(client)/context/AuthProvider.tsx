"use client";

import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
};

type User = {
  _id: string;
  email: string;
  role: string;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const login = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    const { user } = data;

    setUser(data);

    router.push("/");
  };

  const register = async (email: string, password: string) => {
    await api.post("/auth/register", {
      email,
      password,
    });

    router.push("/Login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
