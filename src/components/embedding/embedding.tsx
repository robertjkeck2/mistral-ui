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
      <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
        <Textarea
          placeholder="Paste your text to embed here."
          className="h-full min-h-[300px] max-h-[700px] lg:min-h-[700px] xl:min-h-[700px]"
          value={input}
          onChange={handleInputChange}
        />
        <div
          className={`text-sm ${
            isLoading && "blur-md"
          } rounded-md border bg-muted min-h-[300px] max-h-[700px] lg:min-h-[700px] xl:min-h-[700px] overflow-auto`}
        >
          <div className="p-4">
            <pre>{JSON.stringify(embeddings, null, 2)}</pre>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button onClick={handleSubmit} disabled={isLoading || input == ""}>
          Create Embedding
        </Button>
      </div>
    </div>
  );
}
