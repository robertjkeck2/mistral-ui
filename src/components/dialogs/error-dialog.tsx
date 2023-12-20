import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import React from "react";

interface ErrorDialogProps {
  open: boolean;
  onOpenChange: () => void;
}

export function ErrorDialog({ open, onOpenChange }: ErrorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Error</DialogTitle>
          <DialogDescription>
            Something went wrong. Please try again or update your API key using
            the button in the top right of the page.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onOpenChange}>Ok</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
