"use client";

import React from "react";
import Image from "next/image";
import { ChatBubbleIcon, RulerSquareIcon } from "@radix-ui/react-icons";

import { Button } from "@/ui/button";
import { Separator } from "@/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Textarea } from "@/ui/textarea";

import { MaxTokensSelector } from "../components/maxtokens-selector";
import { ModelSelector } from "../components/model-selector";
import { PresetActions } from "../components/preset-actions";
import { TemperatureSelector } from "../components/temperature-selector";
import { TopPSelector } from "../components/top-p-selector";
import { models } from "../data/models";
import { SafeModeSelector } from "@/components/safe-mode-selector";
import { RandomSeedSelector } from "@/components/random-seed-selector";
import { SystemMessageSelector } from "@/components/system-message-selector";
import { ApiKeyDialog } from "@/components/api-key-dialog";
import { useStore } from "@/hooks/use-store";
import { ModelType } from "@/types/Models";

export default function Home() {
  const apiKey = useStore((state) => state.apiKey);
  const availableModels = useStore((state) => state.availableModels);
  const setAvailableModels = useStore((state) => state.setAvailableModels);

  const [allowApiKeyDialogClose, setAllowApiKeyDialogClose] =
    React.useState<boolean>(false);
  const [openSettings, setOpenSettings] = React.useState<boolean>(true);
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] =
    React.useState<boolean>(false);

  const handleToggleSettings = () => {
    setOpenSettings((prev) => !prev);
  };

  const handleTabChange = (value: string) => {
    setAvailableModels(models, value as ModelType);
  };

  React.useEffect(() => {
    if (apiKey == "") {
      setIsApiKeyDialogOpen(true);
    } else {
      setAllowApiKeyDialogClose(true);
    }
  }, [apiKey]);

  return (
    <>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <Image
            src="/logo-dark.svg"
            width={90}
            height={60}
            alt="Mistral"
            className="block"
          />
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <Button variant="secondary" onClick={handleToggleSettings}>
              Toggle Settings
            </Button>
            <PresetActions
              onApiKeyChangeClick={() => setIsApiKeyDialogOpen(true)}
            />
          </div>
        </div>
        <Separator />
        <Tabs
          defaultValue="chat"
          className="flex-1"
          onValueChange={handleTabChange}
        >
          <div className="container h-full py-6">
            <div
              className={`grid h-full items-stretch gap-6 ${
                openSettings && "md:grid-cols-[1fr_200px]"
              }`}
            >
              {openSettings && (
                <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                  <div className="grid gap-2">
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="chat">
                        <span className="sr-only">Chat</span>
                        <ChatBubbleIcon className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="embedding">
                        <span className="sr-only">Embedding</span>
                        <RulerSquareIcon className="h-4 w-4" />
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <ModelSelector models={availableModels} />
                  {availableModels[0].type === "chat" && (
                    <>
                      <SafeModeSelector />
                      <TemperatureSelector />
                      <MaxTokensSelector />
                      <TopPSelector />
                      <RandomSeedSelector />
                      <SystemMessageSelector />
                    </>
                  )}
                </div>
              )}
              <div className="md:order-1">
                <TabsContent value="chat" className="mt-0 border-0 p-0">
                  <div className="flex h-full flex-col space-y-4">
                    <Textarea
                      placeholder="Write a tagline for an ice cream shop"
                      className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
                    />
                    <div className="flex items-center space-x-2">
                      <Button>Submit</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="embedding" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                      <Textarea
                        placeholder="We're writing to [inset]. Congrats from OpenAI!"
                        className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
                      />
                      <div className="rounded-md border bg-muted"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button>Submit</Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
        <ApiKeyDialog
          open={isApiKeyDialogOpen}
          onOpenChange={(force: boolean) => {
            if (allowApiKeyDialogClose || force) {
              setIsApiKeyDialogOpen(false);
            }
          }}
        />
      </div>
    </>
  );
}
