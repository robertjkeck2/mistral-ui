"use client";

import * as React from "react";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card";
import { Label } from "@/ui/label";
import { Textarea } from "./ui/textarea";

interface SystemMessageSelectorProps {
  defaultValue: string;
}

export function SystemMessageSelector({
  defaultValue,
}: SystemMessageSelectorProps) {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label>System Message</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value !== undefined ? value : "-"}
              </span>
            </div>
            <Textarea
              className="min-h-[125px] max-h-[125px]"
              placeholder="Message"
              value={value}
              onChange={(e) => setValue(e.target.value)}
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
