"use client";

import React from "react";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useStore } from "@/hooks/use-store";

export function Chat() {
  const chatText = useStore((state) => state.chatText);
  const setChatText = useStore((state) => state.setChatText);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const sendMessage = () => {
    setIsLoading(true);
    // TODO - call chat API
    // const response = await sendChat(chatText);
    // updateChat(response);
  };

  return (
    <div className="flex h-full flex-col space-y-4">
      <Textarea
        placeholder="Write a tagline for an ice cream shop"
        className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
        onChange={(e) => setChatText(e.target.value)}
      />
      <div className="flex items-center space-x-2">
        <Button onClick={sendMessage} disabled={isLoading || chatText == ""}>
          Submit
        </Button>
      </div>
    </div>
  );
}
