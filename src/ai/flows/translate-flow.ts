'use server';

import OpenAI from 'openai';
import { z } from 'zod';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const TranslateInputSchema = z.object({
  text: z.string().describe('The text to be translated.'),
  targetLanguage: z.string().describe('The language to translate the text into.'),
});
export type TranslateInput = z.infer<typeof TranslateInputSchema>;

export type TranslateOutput = {
  translatedText: string;
};

export async function translateText(input: TranslateInput): Promise<TranslateOutput> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that translates text. Translate the following text into ${input.targetLanguage}. Only return the translated text, with no additional commentary or explanations.`,
        },
        {
          role: 'user',
          content: input.text,
        },
      ],
      temperature: 0,
    });

    const translatedText = response.choices[0]?.message?.content?.trim();

    if (!translatedText) {
      throw new Error('OpenAI API did not return translated text.');
    }

    return { translatedText };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to translate the text.');
  }
}
