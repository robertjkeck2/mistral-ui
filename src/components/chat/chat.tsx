"use client";

import * as React from "react";

import { useChat } from "ai/react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { ChatMessages } from "./chat-messages";
import { useStore } from "@/hooks/use-store";
import { ErrorDialog } from "../dialogs/error-dialog";

export function Chat() {
  const apiKey = useStore((state) => state.apiKey);
  const model = useStore((state) => state.model);
  const maxTokens = useStore((state) => state.maxTokens);
  const topP = useStore((state) => state.topP);
  const randomSeed = useStore((state) => state.randomSeed);
  const safeMode = useStore((state) => state.safeMode);
  const temperature = useStore((state) => state.temperature);
  const systemMessage = useStore((state) => state.systemMessage);

  const [showError, setShowError] = React.useState<boolean>(false);
  const [isThinking, setIsThinking] = React.useState<boolean>(false);

  const initialMessages: Message[] = [];
  if (systemMessage != "") {
    initialMessages.push({
      id: "system-0",
      role: "system",
      content: systemMessage,
    });
  }

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      body: {
        apiKey,
        model,
        maxTokens,
        topP,
        randomSeed,
        safeMode,
        temperature,
      },
      initialMessages,
      onResponse: () => {
        setIsThinking(false);
      },
      onFinish: (message) => {
        if (message.content == "") {
          setShowError(true);
        }
      },
    });

  return (
    <div className="flex h-full flex-col space-y-4 w-full items-center">
      <ChatMessages messages={messages} isLoading={isLoading && isThinking} />
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          setIsThinking(true);
          handleSubmit(e);
        }}
        className="flex w-5/6 items-center space-x-2"
      >
        <Input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={handleInputChange}
        />
        <Button type="submit" disabled={isLoading || input == ""}>
          <PaperPlaneIcon className="h-4 w-4" />
        </Button>
      </form>
      <ErrorDialog open={showError} onOpenChange={() => setShowError(false)} />
    </div>
  );
}
