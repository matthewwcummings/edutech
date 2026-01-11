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
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: `
      You are an AI assistant that generates homework questions for students based on their information.
`
    });
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Class: Grade 3 Algebra,
              Student Information: ${input.text},
              Task: Generate ONE homework question suitable for this student, tailor to their skillset and interests.
              Delivery: Include only the question in your response without any additional text, plain text format only`,
            },
          ]
        }
      ]
    });

    return {
      text: result.response.text(),
    };
  }),
});

