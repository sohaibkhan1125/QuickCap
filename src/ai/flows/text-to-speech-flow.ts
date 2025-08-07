'use server';

import { z } from 'zod';

const GenerateSpeechInputSchema = z.object({
  text: z.string().describe('The text to be converted to speech.'),
  voice: z.string().default('JBFqnCBsd6RMkjVDRZzb'), // Default voice ID for ElevenLabs
});
export type GenerateSpeechInput = z.infer<typeof GenerateSpeechInputSchema>;

export type GenerateSpeechOutput = {
  audioDataUri: string;
};

export async function generateSpeech(input: GenerateSpeechInput): Promise<GenerateSpeechOutput> {
  const API_KEY = process.env.ELEVENLABS_API_KEY;
  const VOICE_ID = input.voice;
  const URL = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;

  if (!API_KEY) {
    throw new Error('ElevenLabs API key not found in environment variables.');
  }

  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': API_KEY,
      },
      body: JSON.stringify({
        text: input.text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('ElevenLabs API Error:', errorBody);
      throw new Error(`ElevenLabs API request failed with status ${response.status}: ${errorBody}`);
    }

    const audioBuffer = await response.arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString('base64');
    const audioDataUri = `data:audio/mpeg;base64,${base64Audio}`;

    return { audioDataUri };

  } catch (error: any) {
    console.error('ElevenLabs TTS Error:', error);
    throw new Error(error.message || 'Failed to generate audio from text using ElevenLabs.');
  }
}