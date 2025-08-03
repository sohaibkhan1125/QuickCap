'use server';

/**
 * @fileOverview A flow to enhance generated captions using GenAI.
 *
 * - enhanceCaptions - A function that enhances the generated captions.
 * - EnhanceCaptionsInput - The input type for the enhanceCaptions function.
 * - EnhanceCaptionsOutput - The return type for the enhanceCaptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceCaptionsInputSchema = z.object({
  captions: z.string().describe('The generated captions to enhance.'),
});
export type EnhanceCaptionsInput = z.infer<typeof EnhanceCaptionsInputSchema>;

const EnhanceCaptionsOutputSchema = z.object({
  enhancedCaptions: z.string().describe('The enhanced captions.'),
});
export type EnhanceCaptionsOutput = z.infer<typeof EnhanceCaptionsOutputSchema>;

export async function enhanceCaptions(input: EnhanceCaptionsInput): Promise<EnhanceCaptionsOutput> {
  return enhanceCaptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceCaptionsPrompt',
  input: {schema: EnhanceCaptionsInputSchema},
  output: {schema: EnhanceCaptionsOutputSchema},
  prompt: `You are an AI expert in grammar and transcription correction.

  Please review the following captions and correct any errors in transcription, grammar, and punctuation to improve readability and clarity. Ensure the enhanced captions maintain the original meaning and context.

  Captions: {{{captions}}}

  Enhanced Captions:`, // Ensure only the enhanced captions are returned
});

const enhanceCaptionsFlow = ai.defineFlow(
  {
    name: 'enhanceCaptionsFlow',
    inputSchema: EnhanceCaptionsInputSchema,
    outputSchema: EnhanceCaptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
