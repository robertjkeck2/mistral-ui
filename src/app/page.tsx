"use client";

import React from "react";
import Image from "next/image";
import {
  CounterClockwiseClockIcon,
  ChatBubbleIcon,
  RulerSquareIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/ui/button";
import { Separator } from "@/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Textarea } from "@/ui/textarea";

import { MaxTokensSelector } from "../components/maxtokens-selector";
import { ModelSelector } from "../components/model-selector";
import { PresetActions } from "../components/preset-actions";
import { TemperatureSelector } from "../components/temperature-selector";
import { TopPSelector } from "../components/top-p-selector";
import { Model, ModelType, models, types } from "../data/models";
import { SafeModeSelector } from "@/components/safe-mode-selector";
import { RandomSeedSelector } from "@/components/random-seed-selector";

export default function Home() {
  const [openSettings, setOpenSettings] = React.useState<boolean>(true);
  const [availableModels, setAvailableModels] = React.useState<Model[]>(models);
  const [selectedModel, setSelectedModel] = React.useState<Model>(models[0]);

  const handleToggleSettings = () => {
    setOpenSettings((prev) => !prev);
  };

  const handleModelChange = (model: Model) => {
    setSelectedModel(model);
  };

  const handleTabChange = (e: any) => {
    console.log(e.target.value);
    setAvailableModels(
      models.filter((model) => model.type === (e.target.value as ModelType))
    );
    console.log(availableModels);
  };

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
            <PresetActions />
          </div>
        </div>
        <Separator />
        <Tabs defaultValue="chat" className="flex-1" onChange={handleTabChange}>
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
                  <ModelSelector
                    types={types}
                    models={availableModels}
                    onModelChange={handleModelChange}
                  />
                  <SafeModeSelector defaultValue={true} />
                  <TemperatureSelector defaultValue={[0.56]} />
                  <MaxTokensSelector defaultValue={[256]} />
                  <TopPSelector defaultValue={[0.9]} />
                  <RandomSeedSelector defaultValue={undefined} />
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
                      <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <CounterClockwiseClockIcon className="h-4 w-4" />
                      </Button>
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
                      <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <CounterClockwiseClockIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  );
}
