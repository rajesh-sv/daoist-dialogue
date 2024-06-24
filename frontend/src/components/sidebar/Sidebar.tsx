import { cn } from "@/lib/utils";
import ChatRoomsContainer from "./ChatRoomsContainer";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

export default function Sidebar({ className }: { className: string }) {
  return (
    <div className={cn("flex flex-col h-full sm:max-w-96", className)}>
      <SidebarHeader />
      <ChatRoomsContainer className="flex-auto" />
      <SidebarFooter className="mt-auto" />
    </div>
  );
}
