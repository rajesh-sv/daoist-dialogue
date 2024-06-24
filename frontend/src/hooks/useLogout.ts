import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/contexts/AuthContext";
import { useState } from "react";

export default function useLogout() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  // @ts-ignore
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    try {
      setLoading(true);

      const res = await fetch("api/auth/logout", {
        method: "POST",
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("chat-user");
      setAuthUser(null);

      toast({
        title: "Logged out successfully!",
      });
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
  return { loading, logout };
}
