"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import React from "react";
import { useStore } from "@/hooks/use-store";
import { Checkbox } from "@/ui/checkbox";

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (force: boolean) => void;
}

export function ApiKeyDialog({ open, onOpenChange }: ApiKeyDialogProps) {
  const [apiKey, setApiKey] = React.useState<string>("");
  const [remember, setRemember] = React.useState<boolean>(false);
  const setNewApiKey = useStore((state) => state.setApiKey);

  const saveApiKey = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (apiKey == "") return;
    setNewApiKey(apiKey);
    onOpenChange(true);
    if (remember) {
      Cookies.set("mistral-key", apiKey, { expires: 1 });
    } else {
      Cookies.remove("mistral-key");
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onOpenChange(false)}>
      <DialogContent className="w-5/6 sm:max-w-[475px]">
        <form onSubmit={saveApiKey}>
          <DialogHeader>
            <DialogTitle>API Key</DialogTitle>
            <DialogDescription>
              Enter your API key to connect to the Mistral API. You can find
              your API key at{" "}
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
          <DialogFooter className="sm:items-center">
            <div className="flex order-1">
              <Checkbox
                id="remember"
                className="mx-2"
                checked={remember}
                onCheckedChange={(checked) =>
                  setRemember(checked.valueOf() as boolean)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember this API key
                </Label>
                <p className="text-sm text-muted-foreground">
                  Your API key will be stored in your browser cookies.
                </p>
              </div>
            </div>
            <Button
              className="w-full mt-4 sm:mt-0 sm:w-1/6 sm:order-2"
              type="submit"
              disabled={apiKey.length < 24 || apiKey.length > 40}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
