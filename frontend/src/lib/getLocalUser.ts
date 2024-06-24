import { UserType } from "@/types";

export default function getLocalUser(): UserType | null {
  const user = localStorage.getItem("chat-user");
  return user && JSON.parse(user);
}
