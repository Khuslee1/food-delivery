"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";

type AuthContextType = {
  user: User | null;
};

type User = {
  _id: string;
  name: string;
  email: string;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>({
    _id: "IdStr",
    name: "Baachka",
    email: "asdasd@gmail.com",
  });

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
