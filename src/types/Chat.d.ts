type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};
