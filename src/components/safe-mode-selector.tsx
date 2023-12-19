"use client";

import * as React from "react";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card";
import { Label } from "@/ui/label";
import { Switch } from "@/ui/switch";
import { useStore } from "@/hooks/use-store";

export function SafeModeSelector() {
  const safeMode = useStore((state) => state.safeMode);
  const setSafeMode = useStore((state) => state.setSafeMode);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label>Safe Mode</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {safeMode}
              </span>
            </div>
            <Switch
              name="safemode"
              id="safemode"
              defaultChecked={safeMode}
              onCheckedChange={(checked: boolean) => setSafeMode(checked)}
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Whether to inject a safety prompt before all conversations.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
