'use server';

/**
 * @fileOverview A flow to automatically detect the audio language of a video for caption generation.
 *
 * - autoCaption - A function that handles the caption generation process with auto language detection.
 * - AutoCaptionInput - The input type for the autoCaption function.
 * - AutoCaptionOutput - The return type for the autoCaption function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {autoDetectLanguage} from './auto-detect-language';

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
  languageCode: z.string().describe('The detected language code of the video audio.'),
});
export type AutoCaptionOutput = z.infer<typeof AutoCaptionOutputSchema>;

export async function autoCaption(input: AutoCaptionInput): Promise<AutoCaptionOutput> {
  return autoCaptionFlow(input);
}

const generateCaptionsPrompt = ai.definePrompt({
  name: 'generateCaptionsPrompt',
  input: {
    schema: z.object({
      videoDataUri: z.string(),
      languageCode: z.string(),
    }),
  },
  output: {
    schema: z.object({
      captions: z.string(),
    }),
  },
  prompt: `You are an AI expert in generating video captions.

  Generate captions for the provided video in the specified language.

  Video: {{media url=videoDataUri}}
  Language Code: {{languageCode}}
  
  Captions:`,
});

const autoCaptionFlow = ai.defineFlow(
  {
    name: 'autoCaptionFlow',
    inputSchema: AutoCaptionInputSchema,
    outputSchema: AutoCaptionOutputSchema,
  },
  async input => {
    const {languageCode} = await autoDetectLanguage({
      videoDataUri: input.videoDataUri,
    });

    const {output} = await generateCaptionsPrompt({
      videoDataUri: input.videoDataUri,
      languageCode: languageCode,
    });

    return {
      captions: output!.captions,
      languageCode: languageCode,
    };
  }
);
