"use client";

import * as React from "react";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card";
import { Label } from "@/ui/label";
import { Slider } from "@/ui/slider";
import { useStore } from "@/hooks/use-store";

export function TemperatureSelector() {
  const temperature = useStore((state) => state.temperature);
  const setTemperature = useStore((state) => state.setTemperature);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label>Temperature</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {temperature}
              </span>
            </div>
            <Slider
              id="temperature"
              max={1}
              defaultValue={[temperature]}
              step={0.1}
              onValueChange={(value: number[]) => setTemperature(value[0])}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Temperature"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          What sampling temperature to use, between 0.0 and 1.0. Higher values
          like 0.8 will make the output more random, while lower values like 0.2
          will make it more focused and deterministic. We generally recommend
          altering this or top_p but not both.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
