import useLogout from "@/hooks/useLogout";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RoundSpinner } from "../ui/spinner";

export default function Logout() {
  const { loading, logout } = useLogout();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="destructive"
            className="w-12 h-12 p-0"
            onClick={logout}
          >
            {loading ? <RoundSpinner /> : <LogOut />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Logout</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
