// Note: There are no types for the Mistral API client yet.
// @ts-ignore
import MistralClient from "@mistralai/mistralai";

type EmbeddingsRequest = {
  model: string;
  input: string | string[];
};

export async function POST(req: Request) {
  const { apiKey, model, input } = await req.json();

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key required" }), {
      status: 400,
    });
  }

  // Create a new Mistral client instance with the user-provided API key
  const client = new MistralClient(apiKey || "");

  let embeddingsRequest: EmbeddingsRequest = {
    model,
    input,
  };

  const response = await client.embeddings(embeddingsRequest);

  return new Response(JSON.stringify(response));
}
