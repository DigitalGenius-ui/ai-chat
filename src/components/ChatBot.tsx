"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { aiModal } from "@/app/actions/GetAIData";
import { ChatCompletionMessage } from "openai/resources/index.mjs";

function ChatBot() {
  const [content, setContent] = useState<string>("");
  const [answers, setAnswers] = useState<ChatCompletionMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const getAiData = async () => {
    setLoading(true);
    const result = await aiModal(content);
    setAnswers((prev) => [...prev, result as ChatCompletionMessage]);
    setLoading(false);
  };
  return (
    <main className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Write your question..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={getAiData}>Submit</Button>
      </div>
      {answers.map((item, index) => (
        <p key={index + 1}>{item?.content}</p>
      ))}
      <p className="animate-pulse">{loading && "Searching..."}</p>
    </main>
  );
}

export default ChatBot;
