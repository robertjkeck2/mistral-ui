const types = ["chat", "embedding"] as const;

export type ModelType = (typeof types)[number];

export type Model<Type = string> = {
  id: string;
  name: string;
  description: string;
  strengths?: string;
  type: Type;
};
