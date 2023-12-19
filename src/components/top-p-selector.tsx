"use client";

import * as React from "react";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card";
import { Label } from "@/ui/label";
import { Slider } from "@/ui/slider";
import { useStore } from "@/hooks/use-store";

export function TopPSelector() {
  const topP = useStore((state) => state.topP);
  const setTopP = useStore((state) => state.setTopP);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label>Top P</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {topP}
              </span>
            </div>
            <Slider
              id="top-p"
              max={1}
              defaultValue={[topP]}
              step={0.1}
              onValueChange={(value: number[]) => setTopP(value[0])}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Top P"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Nucleus sampling, where the model considers the results of the tokens
          with top_p probability mass. So 0.1 means only the tokens comprising
          the top 10% probability mass are considered. We generally recommend
          altering this or temperature but not both.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
