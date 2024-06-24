import { cn } from "@/lib/utils";
import Logout from "./Logout";
import AddChatRoom from "./CreateChatRoom";

export default function SidebarFooter({ className }: { className: string }) {
  return (
    <div className={cn("flex justify-between px-8 py-4", className)}>
      <Logout />
      <AddChatRoom />
    </div>
  );
}
