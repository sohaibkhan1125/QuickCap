'use server';

/**
 * @fileOverview A flow to automatically generate captions for a video using OpenAI.
 *
 * - autoCaption - A function that handles the caption generation process.
 * - AutoCaptionInput - The input type for the autoCaption function.
 * - AutoCaptionOutput - The return type for the auto-caption function.
 */

import {z} from 'genkit';
import OpenAI from 'openai';

const AutoCaptionInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AutoCaptionInput = z.infer<typeof AutoCaptionInputSchema>;

export type AutoCaptionOutput = {
  captions: string;
  language: string;
};

// Helper to convert data URI to a File-like object for OpenAI API
async function dataUriToStream(dataUri: string) {
    const response = await fetch(dataUri);
    if (!response.ok) {
        throw new Error('Failed to fetch data URI');
    }
    const blob = await response.blob();
    return new File([blob], "video.mp4", { type: blob.type });
}

export async function autoCaption(input: AutoCaptionInput): Promise<AutoCaptionOutput> {
  const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
  });
  
  const videoFile = await dataUriToStream(input.videoDataUri);

  try {
    const transcription = await openai.audio.transcriptions.create({
        file: videoFile,
        model: 'whisper-1',
    });
  
    // Note: OpenAI's transcription API doesn't explicitly return the language code,
    // but it auto-detects it. For simplicity, we'll mark it as 'auto-detected'.
    // A more advanced implementation could use another call to identify the language.
    return {
      captions: transcription.text,
      language: 'auto-detected',
    };
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("The AI model failed to transcribe the video. This can happen with unsupported audio formats or network issues.");
  }
}
