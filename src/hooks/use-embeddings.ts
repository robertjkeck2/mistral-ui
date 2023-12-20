import * as React from "react";

export const useEmbeddings = (apiKey: string, model: string) => {
  const [embeddings, setEmbeddings] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [input, setInput] = React.useState<string>("");

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(event.target.value);
    },
    []
  );

  const handleSubmit = React.useCallback(async () => {
    setIsLoading(true);
    console.log("input", input);
    const response = await fetch("/api/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey,
        model,
        input,
      }),
    });
    const json = await response.json();
    setEmbeddings(json);
    setIsLoading(false);
  }, [apiKey, model, input]);

  return { embeddings, isLoading, input, handleInputChange, handleSubmit };
};
