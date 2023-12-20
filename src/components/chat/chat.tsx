"use client";

import React from "react";

import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useStore } from "@/hooks/use-store";
import { Input } from "../ui/input";
import { ChatMessages } from "./chat-messages";

export function Chat() {
  const chatText = useStore((state) => state.chatText);
  const setChatText = useStore((state) => state.setChatText);
  const addChatMessage = useStore((state) => state.addChatMessage);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const sendMessage = () => {
    setIsLoading(true);
    addChatMessage({
      role: "user",
      content: chatText,
    });
    // TODO - call chat API
    // const response = await sendChat(chatText);
    // updateChat(response);
  };

  return (
    <div className="flex h-full flex-col space-y-4 w-full items-center">
      <ChatMessages />
      <div className="flex w-5/6 items-center space-x-2">
        <Input
          type="text"
          placeholder="Type a message..."
          onChange={(e) => setChatText(e.target.value)}
        />
        <Button onClick={sendMessage} disabled={isLoading || chatText == ""}>
          <PaperPlaneIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
