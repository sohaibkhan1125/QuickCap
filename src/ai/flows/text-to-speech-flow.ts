'use server';

import OpenAI from 'openai';
import { z } from 'zod';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const GenerateSpeechInputSchema = z.object({
  text: z.string().describe('The text to be converted to speech.'),
  voice: z.string().default('alloy'), // Default voice
});
export type GenerateSpeechInput = z.infer<typeof GenerateSpeechInputSchema>;

export type GenerateSpeechOutput = {
  audioDataUri: string;
};

export async function generateSpeech(input: GenerateSpeechInput): Promise<GenerateSpeechOutput> {
  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: input.voice as any, // Cast as any to match available voices
      input: input.text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    const audioDataUri = `data:audio/mpeg;base64,${buffer.toString('base64')}`;

    return { audioDataUri };

  } catch (error) {
    console.error('OpenAI TTS Error:', error);
    throw new Error('Failed to generate audio from text using OpenAI.');
  }
}