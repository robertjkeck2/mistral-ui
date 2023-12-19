"use client";

import React from "react";

import { useStore } from "@/hooks/use-store";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function Embedding() {
  const embeddingText = useStore((state) => state.embeddingText);
  const setEmbeddingText = useStore((state) => state.setEmbeddingText);

  const [embedding, setEmbedding] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleEmbedding = () => {
    setIsLoading(true);
    // TODO - call embedding API
    // const embedding = await getEmbedding(embeddingText);
    // setEmbedding(embedding);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
        <Textarea
          placeholder="Paste your text to embed here."
          className="h-full min-h-[300px] max-h-[700px] lg:min-h-[700px] xl:min-h-[700px]"
          onChange={(e) => setEmbeddingText(e.target.value)}
        />
        <div className="rounded-md border bg-muted">
          <div className="p-4">{embedding}</div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          onClick={handleEmbedding}
          disabled={isLoading || embeddingText == ""}
        >
          Create Embedding
        </Button>
      </div>
    </div>
  );
}
