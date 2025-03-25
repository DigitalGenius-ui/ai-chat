import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_Google_Gemini,
  dangerouslyAllowBrowser: true,
});

export const aiModal = async (content: string) => {
  const completion = await openai.chat.completions.create({
    model: "google/gemini-2.0-pro-exp-02-05:free",
    messages: [{ role: "user", content: content }],
  });
  console.log(completion.choices[0].message);
  return completion.choices[0].message;
};
