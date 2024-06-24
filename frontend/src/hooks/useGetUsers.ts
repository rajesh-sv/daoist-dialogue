import { useToast } from "@/components/ui/use-toast";
import { UserType } from "@/types";
import { useEffect, useState } from "react";

export default function useGetUsers(): { loading: boolean; users: UserType[] } {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/users");

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setUsers(data);
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

    getUsers();
  }, [setUsers]);

  return { loading, users };
}
