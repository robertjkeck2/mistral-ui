"use client";

import * as React from "react";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { useStore } from "@/hooks/use-store";

export function SystemMessageSelector() {
  const systemMessage = useStore((state) => state.systemMessage);
  const setSystemMessage = useStore((state) => state.setSystemMessage);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label>System Message</Label>
            </div>
            <Textarea
              className="min-h-[125px] max-h-[125px]"
              placeholder="Message"
              value={systemMessage}
              onChange={(e) => setSystemMessage(e.target.value)}
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The system message to send to the chat. This will set the system
          context for future chat completions.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
