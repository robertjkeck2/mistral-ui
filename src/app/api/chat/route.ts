import { OpenAIStream, StreamingTextResponse } from "ai";

// Note: There are no types for the Mistral API client yet.
// @ts-ignore
import MistralClient from "@mistralai/mistralai";

type ChatRequest = {
  model: string;
  messages: Array<{ role: string; content: string }>;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  randomSeed?: number;
  safeMode?: boolean;
  stream?: boolean;
};

export async function POST(req: Request) {
  const {
    apiKey,
    model,
    maxTokens,
    topP,
    randomSeed,
    safeMode,
    temperature,
    messages,
  } = await req.json();

  // Create a new Mistral client instance with the user-provided API key
  const client = new MistralClient(apiKey || "");

  let chatRequest: ChatRequest = {
    model,
    messages,
    topP,
    temperature,
    safeMode,
    stream: true,
  };

  if (maxTokens != undefined && maxTokens > 0) {
    chatRequest = { ...chatRequest, maxTokens };
  }
  if (randomSeed != undefined && randomSeed > 0) {
    chatRequest = { ...chatRequest, randomSeed };
  }

  const response = await client.chatStream(chatRequest);

  // Convert the response into a friendly text-stream. The Mistral client responses are
  // compatible with the Vercel AI SDK OpenAIStream adapter.
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
