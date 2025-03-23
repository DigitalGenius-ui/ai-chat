"use client";

import React, { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { LoaderCircle } from "lucide-react";

type coatchType = {
  name: string;
  img: string;
};

const coachingExpert: coatchType[] = [
  {
    name: "Joanna",
    img: "/t1.png",
  },
  {
    name: "Salli",
    img: "/t2.png",
  },
  {
    name: "Joey",
    img: "/t3.png",
  },
];

type CardType = {
  item: {
    coatchingOption: string;
    img: string;
  };
  index: number;
};

function Card({ item, index }: CardType) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectCoatch, setSelectCoatch] = useState<coatchType>(
    {} as coatchType
  );
  const [topic, setTopic] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const createDiscussion = useMutation(api.discussion.createDiscussion);
  const handleNext = async () => {
    if (!topic || !selectCoatch.name) return;
    setLoading(true);
    try {
      const result = await createDiscussion({
        coachingOption: item.coatchingOption,
        topic,
        expertName: selectCoatch.name,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
      throw new Error("Error creating discussion");
    } finally {
      setLoading(false);
      setTopic("");
      setSelectCoatch({} as coatchType);
      setOpenDialog(false);
    }
  };
  return (
    <BlurFade delay={index * 0.1} inView key={item.coatchingOption}>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild onClick={() => setOpenDialog(true)}>
          <div className="w-full bg-secondary rounded-lg p-3 flex flex-col items-center gap-4 group cursor-pointer">
            <Image
              src={item.img}
              width={80}
              height={80}
              alt="card-img"
              className="group-hover:rotate-12 transition-all duration-300"
            />
            <h1 className="text-center capitalize leading-5">
              {item.coatchingOption}
            </h1>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="capitalize">
              {item.coatchingOption}
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-4">
            <div className="grid flex-1 gap-3">
              <Label className="font-normal">
                Enter a topic to master your skills in
                <p className="capitalize -ml-1">{item.coatchingOption}</p>
              </Label>
              <Textarea
                onChange={(e) => setTopic(e.target.value)}
                value={topic}
                placeholder="Enter your topic here..."
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm">Select your coaching expert</p>
            <div className="flex items-center gap-3 mt-3">
              {coachingExpert.map((expert) => (
                <div key={expert.name} className="text-center leading-4">
                  <div
                    className={cn(
                      "w-20 h-23 p-1 rounded-lg overflow-hidden hover:scale-110 transition-all duration-300 cursor-pointer",
                      {
                        "border border-blue-500":
                          selectCoatch.name === expert.name,
                      }
                    )}
                    onClick={() => setSelectCoatch(expert)}
                  >
                    <Image
                      src={expert.img}
                      alt="coach-image"
                      width={140}
                      height={140}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "0.5rem",
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{expert.name}</p>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button
                onClick={() => {
                  setTopic("");
                  setSelectCoatch({} as coatchType);
                }}
                type="button"
                variant="secondary"
                disabled={loading}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="blue"
              disabled={!topic || !selectCoatch.name || loading}
              onClick={handleNext}
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Next"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </BlurFade>
  );
}

export default Card;
