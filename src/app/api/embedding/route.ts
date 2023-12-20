// Note: There are no types for the Mistral API client yet.
// @ts-ignore
import MistralClient from "@mistralai/mistralai";

type EmbeddingRequest = {
  model: string;
  input: string | string[];
};

export async function POST(req: Request) {
  const { apiKey, model, input } = await req.json();

  // Create a new Mistral client instance with the user-provided API key
  const client = new MistralClient(apiKey || "");

  let chatRequest: EmbeddingRequest = {
    model,
    input,
  };

  const response = await client.chatStream(chatRequest);

  // Convert the response into a friendly text-stream. The Mistral client responses are
  // compatible with the Vercel AI SDK OpenAIStream adapter.
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
