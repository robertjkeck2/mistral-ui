"use client";

import * as React from "react";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card";
import { Label } from "@/ui/label";
import { Input } from "./ui/input";

interface RandomSeedSelectorProps {
  defaultValue: number | undefined;
}

export function RandomSeedSelector({ defaultValue }: RandomSeedSelectorProps) {
  const [value, setValue] = React.useState<number | undefined>(defaultValue);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label>Random Seed</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value !== undefined ? value : "-"}
              </span>
            </div>
            <Input
              type="tel"
              min={0}
              max={99999}
              maxLength={5}
              placeholder="Seed"
              value={value !== undefined ? value : ""}
              onChange={(e) => setValue(Number(e.target.value))}
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The seed to use for random sampling. If set, different calls will
          generate deterministic results.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
