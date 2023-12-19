"use client";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import React from "react";
import { useStore } from "@/hooks/use-store";

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (force: boolean) => void;
}

export function ApiKeyDialog({ open, onOpenChange }: ApiKeyDialogProps) {
  const [apiKey, setApiKey] = React.useState<string>("");
  const setNewApiKey = useStore((state) => state.setApiKey);

  return (
    <Dialog open={open} onOpenChange={() => onOpenChange(false)}>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>API Key</DialogTitle>
          <DialogDescription>
            Enter your API key to connect to the Mistral API. You can find your
            API key at{" "}
            <Link
              href="https://console.mistral.ai/"
              className="text-blue-500 hover:underline"
              target="_blank"
            >
              https://console.mistral.ai/
            </Link>
            .
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">API Key</Label>
            <Input
              id="name"
              onChange={(e) => setApiKey(e.target.value)}
              autoFocus
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              if (apiKey == "") return;
              setNewApiKey(apiKey);
              onOpenChange(true);
            }}
            disabled={apiKey.length < 24 || apiKey.length > 40}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
