"use client";

import * as React from "react";
import { SliderProps } from "@radix-ui/react-slider";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card";
import { Label } from "@/ui/label";
import { Switch } from "@/ui/switch";

interface SafeModeSelectorProps {
  defaultValue: boolean;
}

export function SafeModeSelector({ defaultValue }: SafeModeSelectorProps) {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature">Safe Mode</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Switch name="show" id="show" defaultChecked={defaultValue} />
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
