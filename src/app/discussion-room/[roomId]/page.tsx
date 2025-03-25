"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { LoaderCircle } from "lucide-react";
import { coachingExpert, coatchType } from "@/app/dashboard/data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@stackframe/stack";
import RecordRTC from "recordrtc";

function DiscussionRoom() {
  // recording
  const recorder = useRef<RecordRTC | null>(null);
  const [enableMic, setEnableMic] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const { roomId } = useParams();
  const discussionId = roomId as Id<"discussionRoom">;

  const [expert, setExpert] = useState<coatchType | undefined>(
    {} as coatchType | undefined
  );

  const getDiscussionData = useQuery(api.discussion.getDiscussion, {
    id: discussionId,
  });

  useEffect(() => {
    if (getDiscussionData) {
      const findCoach = coachingExpert.find(
        (item) => item.name === getDiscussionData?.expertName
      );
      setExpert(findCoach);
    }
  }, [getDiscussionData]);

  if (!getDiscussionData) {
    return (
      <div className="w-full h-60vh flex items-center justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  let silenceTimeout: string | number | NodeJS.Timeout | undefined;

  const connectToServer = async () => {
    setLoading(true);
    const RecordRTC = (await import("recordrtc")).default;
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          setEnableMic(false);
          recorder.current = new RecordRTC(stream, {
            type: "audio",
            mimeType: "audio/webm;codecs=pcm",
            recorderType: RecordRTC.StereoAudioRecorder,
            timeSlice: 250,
            desiredSampRate: 16000,
            numberOfAudioChannels: 1,
            bufferSize: 4096,
            audioBitsPerSecond: 128000,
            ondataavailable: async (blob) => {
              // if (!realtimeTranscriber.current) return;

              clearTimeout(silenceTimeout);

              console.log(blob);

              // restart thensilent detection timer
              silenceTimeout = setTimeout(() => {
                console.log("User stoped talking!");
                // handle user stopped talking
              }, 2000);
            },
          });
          recorder.current?.startRecording();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const disconnedServer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    recorder.current?.pauseRecording();
    recorder.current = null;
    setEnableMic(true);
  };

  return (
    <section className="space-y-4">
      <h1 className="capitalize font-bold text-lg">
        {getDiscussionData?.coachingOption}
      </h1>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div
            className="relative flex flex-col items-center justify-center 
          gap-1 w-full h-[60vh] bg-secondary rounded-lg border border-gray-300"
          >
            {expert?.img && (
              <Image
                src={expert?.img}
                alt="expert-img"
                width={120}
                height={120}
                className="w-[80px] h-[80px] rounded-full animate-pulse"
                priority
              />
            )}
            <p className="text-gray-700 text-sm">{expert?.name}</p>
            <div
              className="w-[9rem] h-[5rem] bg-gray-200 rounded-lg flex items-center justify-center
            absolute right-10 bottom-10 border border-gray-300"
            >
              <UserButton />
            </div>
          </div>
          <div className="flex items-center justify-center mt-4">
            {enableMic ? (
              <Button variant="blue" onClick={connectToServer}>
                {loading && <LoaderCircle className="animate-spin" />} Connect
              </Button>
            ) : (
              <Button variant="destructive" onClick={disconnedServer}>
                Disconnect
              </Button>
            )}
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-[60vh] bg-secondary rounded-lg flex items-center justify-center border border-gray-300">
            <h2 className="text-gray-500 text-md">Chat Section</h2>
          </div>
          <h2 className="text-gray-500">
            At the end of your conversation we will automatically generate
            feedback/notes from your conversation
          </h2>
        </div>
      </section>
    </section>
  );
}

export default DiscussionRoom;
