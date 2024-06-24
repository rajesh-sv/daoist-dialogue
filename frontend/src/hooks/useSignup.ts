import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { SignupInputsType } from "@/types";
import { useAuthContext } from "@/contexts/AuthContext";

export default function useSignup() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  // @ts-ignore
  const { setAuthUser } = useAuthContext();

  const handleValidation = ({
    fullName,
    username,
    password,
    confirmPassword,
  }: SignupInputsType) => {
    if (!fullName || !username || !password || !confirmPassword) {
      toast({
        variant: "destructive",
        title: "Invalid",
        description: "Please fill in all the fields!",
      });
      return false;
    }

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Invalid",
        description: "Passwords do not match",
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

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
  }: SignupInputsType) => {
    const validationSuccess = handleValidation({
      fullName,
      username,
      password,
      confirmPassword,
    });

    if (!validationSuccess) return;

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
        }),
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

  return { loading, signup };
}
