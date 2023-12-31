import { models } from "@/data/models";
import { Model, ModelType } from "@/types/Model";
import { create } from "zustand";
import Cookies from "js-cookie";

type Store = {
  apiKey: string;
  model: string;
  safeMode: boolean;
  temperature: number;
  maxTokens: number;
  topP: number;
  randomSeed: number;
  systemMessage: string;
  availableModels: Model<ModelType>[];
  embeddingText: string;
  setApiKey: (apiKey: string) => void;
  setModel: (model: string) => void;
  setSafeMode: (safeMode: boolean) => void;
  setTemperature: (temperature: number) => void;
  setMaxTokens: (maxTokens: number) => void;
  setTopP: (topP: number) => void;
  setRandomSeed: (randomSeed: number) => void;
  setSystemMessage: (systemMessage: string) => void;
  setAvailableModels: (models: Model<ModelType>[], type: ModelType) => void;
  setEmbeddingText: (embeddingText: string) => void;
};

export const useStore = create<Store>((set) => ({
  apiKey: Cookies.get("mistral-key") || "",
  model: "mistral-tiny",
  safeMode: false,
  temperature: 0.7,
  maxTokens: 0,
  topP: 1,
  randomSeed: 0,
  systemMessage: "",
  availableModels: models.filter((model) => model.type === "chat"),
  embeddingText: "",
  setApiKey: (apiKey: string) => set({ apiKey }),
  setModel: (model: string) => set({ model }),
  setSafeMode: (safeMode: boolean) => set({ safeMode }),
  setTemperature: (temperature: number) => set({ temperature }),
  setMaxTokens: (maxTokens: number) => set({ maxTokens }),
  setTopP: (topP: number) => set({ topP }),
  setRandomSeed: (randomSeed: number) => set({ randomSeed }),
  setSystemMessage: (systemMessage: string) => set({ systemMessage }),
  setAvailableModels: (models: Model<ModelType>[], type: ModelType) =>
    set({
      availableModels: models.filter((model) => model.type === type),
      model: models.filter((model) => model.type === type)[0].name,
    }),
  setEmbeddingText: (embeddingText: string) => set({ embeddingText }),
}));
