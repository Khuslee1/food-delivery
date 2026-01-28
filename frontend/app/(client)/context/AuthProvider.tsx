"use client";

import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  signout: () => void;
  getMe: () => Promise<void>;
  updateUser: () => Promise<void>;
};

type User = {
  _id: string;
  email: string;
  role: string;
  address: string;
};
type LoginRes = {
  user: User;
  accessToken: string;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const login = async (email: string, password: string) => {
    const { data } = await api.post<LoginRes>("/auth/login", {
      email,
      password,
    });

    const { user, accessToken } = data;

    localStorage.setItem("accessToken", accessToken);

    setUser(data.user);
    if (data.user.role == "admin") return router.push("/admin");
    router.push("/");
  };

  const register = async (email: string, password: string) => {
    await api.post("/auth/register", {
      email,
      password,
    });

    router.push("/Login");
  };

  const updateUser = async () => {
    const { data } = await api.get("/auth/user");
    setUser(data.newUser);
  };

  const getMe = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const { data } = await api.get<{ user: User }>("/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setUser(data.user);
  };
  useEffect(() => {
    const fetchMe = async () => {
      try {
        getMe();
      } catch {
        localStorage.removeItem("accessToken");
      }
    };

    fetchMe();
  }, []);
  const signout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, signout, getMe, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
