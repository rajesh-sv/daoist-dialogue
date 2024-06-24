import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { LoginInputsType } from "@/types";
import { useAuthContext } from "@/contexts/AuthContext";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  // @ts-ignore
  const { setAuthUser } = useAuthContext();

  const handleValidation = ({ username, password }: LoginInputsType) => {
    if (!username || !password) {
      toast({
        variant: "destructive",
        title: "Invalid",
        description: "Please fill in all the fields!",
      });
      return false;
    }

    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Invalid",
        description: "Password must be at least 6 characters",
      });
      return false;
    }

    return true;
  };

  const login = async ({ username, password }: LoginInputsType) => {
    const validationSuccess = handleValidation({
      username,
      password,
    });

    if (!validationSuccess) return;

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        // @ts-ignore
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
}
