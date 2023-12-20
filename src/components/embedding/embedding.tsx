"use client";

import React from "react";

import { useStore } from "@/hooks/use-store";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useEmbeddings } from "@/hooks/use-embeddings";

export function Embedding() {
  const apiKey = useStore((state) => state.apiKey);
  const model = useStore((state) => state.model);

  const { embeddings, isLoading, input, handleInputChange, handleSubmit } =
    useEmbeddings(apiKey, model);

  return (
    <div className="flex flex-col space-y-4">
      <form onSubmit={handleSubmit}>
        <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
          <Textarea
            placeholder="Paste your text to embed here."
            className="h-full min-h-[300px] max-h-[650px] lg:min-h-[650px] xl:min-h-[650px]"
            value={input}
            onChange={handleInputChange}
          />
          <div className="text-sm rounded-md border bg-muted min-h-[300px] max-h-[650px] lg:min-h-[650px] xl:min-h-[650px] overflow-auto">
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <span className="text-lg text-gray-300 z-10">Loading...</span>
              </div>
            )}
            <div className="p-4">
              <pre>{JSON.stringify(embeddings, null, 2)}</pre>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          className="mt-4 w-full py-6"
          disabled={isLoading || input == ""}
        >
          Create Embedding
        </Button>
      </form>
    </div>
  );
}
