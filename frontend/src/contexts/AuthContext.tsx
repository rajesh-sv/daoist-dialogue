import { AuthContextType, UserType } from "@/types";
import getLocalUser from "@/lib/getLocalUser";
import { ReactNode, createContext, useContext, useState } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<UserType | null>(getLocalUser());

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
