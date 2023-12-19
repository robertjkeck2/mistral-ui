import { DotsHorizontalIcon, ExternalLinkIcon } from "@radix-ui/react-icons";

import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

interface PresetActionsProps {
  onApiKeyChangeClick: () => void;
}

export function PresetActions({ onApiKeyChangeClick }: PresetActionsProps) {
  const openDocs = () => {
    window.open("https://docs.mistral.ai", "_blank");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            <span className="sr-only">Actions</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => onApiKeyChangeClick()}>
            Update API Key
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={openDocs}>
            View Docs <ExternalLinkIcon className="w-4 h-4 ml-2" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
