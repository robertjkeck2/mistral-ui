export const types = ["Chat Completion", "Embedding"] as const;

export type ModelType = (typeof types)[number];

export interface Model<Type = string> {
  id: string;
  name: string;
  description: string;
  strengths?: string;
  type: Type;
}

export const models: Model<ModelType>[] = [
  {
    id: "1",
    name: "mistral-tiny",
    description:
      "This generative endpoint is best used for large batch processing tasks where cost is a significant factor but reasoning capabilities are not crucial. Currently powered by Mistral-7B-v0.2, a better fine-tuning of the initial Mistral-7B released, inspired by the fantastic work of the community.",
    type: "Chat Completion",
  },
  {
    id: "2",
    name: "mistral-small",
    description:
      "Higher reasoning capabilities and more capabilities. Currently powered Mixtral-8X7B-v0.1, a sparse mixture of experts model with 12B active parameters.",
    type: "Chat Completion",
  },
  {
    id: "3",
    name: "mistral-medium",
    description:
      "This endpoint currently relies on an internal prototype model.",
    type: "Chat Completion",
  },
  {
    id: "4",
    name: "mistral-embed",
    description:
      "Embedding models enable retrieval and retrieval-augmented generation applications.",
    type: "Embedding",
  },
];
