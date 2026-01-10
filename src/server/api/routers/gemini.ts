// src/server/api/routers/gemini.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export const geminiRouter = createTRPCRouter({
  testKey: publicProcedure
  .input(z.object({text: z.string()}))
  .query(async({ input }) => {

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(input.text);
    console.log("hi", result);

    return {
      text: result.response.text(),
    };
  }),
});

