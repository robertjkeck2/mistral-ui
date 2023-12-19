import { testChats } from "@/data/test-chats";
import { useStore } from "@/hooks/use-store";
import { PersonIcon } from "@radix-ui/react-icons";

export function ChatMessages() {
  const chatMessages = testChats; //useStore((state) => state.chatMessages);

  return (
    <div className="flex w-full min-h-[650px] max-h-[650px]">
      <div className="flex flex-col w-full overflow-y-auto">
        {chatMessages
          .filter((message) => message.role != "system")
          .map((message, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full">
                  <span className="text-sm font-bold text-gray-500">
                    {message.role == "user" ? <PersonIcon /> : "M"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-500">
                    {message.role == "user" ? "You" : "Mistral"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col pb-6">
                <span className="text-sm text-gray-500">{message.content}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
