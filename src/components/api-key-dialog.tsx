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

interface APIKeyDialogProps {
  open: boolean;
  onOpenChange: () => void;
}

export function APIKeyDialog({ open, onOpenChange }: APIKeyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={() => onOpenChange()}>
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
            <Input id="name" autoFocus />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
