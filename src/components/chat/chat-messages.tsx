"use client";

import React from "react";
import { useStore } from "@/hooks/use-store";
import { PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export function ChatMessages() {
  const chatMessages = useStore((state) => state.chatMessages);

  React.useEffect(() => {
    scrollToEnd();
  }, [chatMessages]);

  const scrollToEnd = () => {
    const chat = document.getElementById("chatMessages");
    chat?.scrollTo(0, chat.scrollHeight);
  };

  return (
    <div className="flex w-5/6 min-h-[650px] max-h-[650px]">
      <div
        id="chatMessages"
        className="flex flex-col w-full overflow-y-auto px-4"
      >
        {!chatMessages ||
          (chatMessages.length == 0 && (
            <div className="flex flex-col w-full h-full space-y-2 justify-center items-center">
              <Image
                src="/mistral-m.png"
                width={50}
                height={50}
                alt="Mistral"
                className="block pb-4"
              />
              <span className="text-lg font-bold text-gray-300">
                What can I help you with?
              </span>
            </div>
          ))}
        {chatMessages
          .filter((message) => message.role != "system")
          .map((message, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-6 h-6 bg-black border border-white rounded-full">
                  <span className="text-sm font-bold text-white">
                    {message.role == "user" ? (
                      <PersonIcon width={14} height={14} />
                    ) : (
                      <Image
                        src="/mistral-m.png"
                        width={14}
                        height={14}
                        alt="Mistral"
                        className="block"
                      />
                    )}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-400">
                    {message.role == "user" ? "You" : "Mistral"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col pb-6">
                <span className="text-md text-gray-300">{message.content}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
