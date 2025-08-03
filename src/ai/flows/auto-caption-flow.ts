'use server';

/**
 * @fileOverview A flow to automatically generate captions for a video using OpenAI.
 *
 * - autoCaption - A function that handles the caption generation process.
 * - AutoCaptionInput - The input type for the autoCaption function.
 * - AutoCaptionOutput - The return type for the autoCaption function.
 */

import {ai} from '@/ai/genkit';
import {z, Part} from 'genkit';

const AutoCaptionInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AutoCaptionInput = z.infer<typeof AutoCaptionInputSchema>;

const AutoCaptionOutputSchema = z.object({
  captions: z.string().describe('The generated captions for the video.'),
  language: z.string().describe('The detected language of the video audio.'),
});
export type AutoCaptionOutput = z.infer<typeof AutoCaptionOutputSchema>;

export async function autoCaption(input: AutoCaptionInput): Promise<AutoCaptionOutput> {
  return autoCaptionFlow(input);
}

const autoCaptionFlow = ai.defineFlow(
  {
    name: 'autoCaptionFlow',
    inputSchema: AutoCaptionInputSchema,
    outputSchema: AutoCaptionOutputSchema,
  },
  async (input) => {
    
    const transcription = await ai.transcribe({
        media: {
            url: input.videoDataUri
        },
        format: 'text'
    });
    
    // Note: OpenAI's transcription API doesn't explicitly return the language code,
    // but it auto-detects it. For simplicity, we'll mark it as 'auto-detected'.
    // A more advanced implementation could use another call to identify the language.
    return {
      captions: transcription.text,
      language: 'auto-detected',
    };
  }
);
