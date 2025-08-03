'use server';

/**
 * @fileOverview A flow to automatically detect the audio language of a video.
 *
 * - autoDetectLanguage - A function that handles the language detection process.
 * - AutoDetectLanguageInput - The input type for the autoDetectLanguage function.
 * - AutoDetectLanguageOutput - The return type for the autoDetectLanguage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoDetectLanguageInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AutoDetectLanguageInput = z.infer<typeof AutoDetectLanguageInputSchema>;

const AutoDetectLanguageOutputSchema = z.object({
  languageCode: z.string().describe('The detected language code of the video audio.'),
});
export type AutoDetectLanguageOutput = z.infer<typeof AutoDetectLanguageOutputSchema>;

export async function autoDetectLanguage(input: AutoDetectLanguageInput): Promise<AutoDetectLanguageOutput> {
  return autoDetectLanguageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'autoDetectLanguagePrompt',
  input: {schema: AutoDetectLanguageInputSchema},
  output: {schema: AutoDetectLanguageOutputSchema},
  prompt: `You are an AI expert in language detection.

  Analyze the audio from the provided video to identify the predominant language spoken.
  Return the language code corresponding to the identified language.

  Video: {{media url=videoDataUri}}
  \n  Respond only with the language code.`, // Ensure only the language code is returned
});

const autoDetectLanguageFlow = ai.defineFlow(
  {
    name: 'autoDetectLanguageFlow',
    inputSchema: AutoDetectLanguageInputSchema,
    outputSchema: AutoDetectLanguageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
