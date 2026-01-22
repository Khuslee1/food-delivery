"use client";

import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
};

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const login = async (username: string, password: string) => {
    const { data } = await api.post("/auth/post", {
      username,
      password,
    });

    const { user } = data;

    setUser(data);

    router.push("/");
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    await api.post("/auth/register", {
      username,
      password,
      email,
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
