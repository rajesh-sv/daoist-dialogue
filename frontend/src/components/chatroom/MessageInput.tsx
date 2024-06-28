import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { RoundSpinner } from "../ui/spinner";
import useAddChatRoomMessage from "@/hooks/useAddChatRoomMessage";

export default function MessageInput({ className }: { className: string }) {
  const [message, setMessage] = useState("");
  const { loading, addMessage } = useAddChatRoomMessage();

  return (
    <div className={cn("p-8 flex gap-4 items-end", className)}>
      <Textarea
        placeholder="Type your message here."
        className="resize-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addMessage({ message });
            setMessage("");
          }
        }}
      />
      <Button
        type="submit"
        variant="secondary"
        className="w-12 h-12 p-0 flex-none"
        disabled={loading}
        onClick={() => {
          addMessage({ message });
          setMessage("");
        }}
      >
        {loading ? <RoundSpinner /> : <Send />}
      </Button>
    </div>
  );
}
