"use client";

import * as React from "react";
import { SliderProps } from "@radix-ui/react-slider";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card";
import { Label } from "@/ui/label";
import { Slider } from "@/ui/slider";

interface MaxTokensSelectorProps {
  defaultValue: SliderProps["defaultValue"] | undefined;
}

export function MaxTokensSelector({ defaultValue }: MaxTokensSelectorProps) {
  const [value, setValue] = React.useState<
    SliderProps["defaultValue"] | undefined
  >(defaultValue);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label>Max Tokens</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value !== undefined ? value : "-"}
              </span>
            </div>
            <Slider
              id="maxtokens"
              max={4000}
              defaultValue={value}
              step={10}
              onValueChange={setValue}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Max Tokens"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The maximum number of tokens to generate in the completion. The token
          count of your prompt plus max_tokens cannot exceed the model's context
          length.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
