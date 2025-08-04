import { createClient, DeepgramClient } from '@deepgram/sdk';
import { z } from 'zod';

const AutoCaptionInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
});
export type AutoCaptionInput = z.infer<typeof AutoCaptionInputSchema>;

export type AutoCaptionOutput = {
  captions: string;
  language: string;
};

// Helper to convert data URI to a Buffer for Deepgram API
function dataUriToBuffer(dataUri: string) {
    const base64 = dataUri.split(',')[1];
    if (!base64) {
        throw new Error('Invalid data URI');
    }
    return Buffer.from(base64, 'base64');
}

export async function autoCaption(input: AutoCaptionInput): Promise<AutoCaptionOutput> {
  const deepgram: DeepgramClient = createClient(process.env.DEEPGRAM_API_KEY!);

  const videoBuffer = dataUriToBuffer(input.videoDataUri);

  try {
    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      videoBuffer,
      {
        smart_format: true,
        model: 'nova-2',
        detect_language: true,
      }
    );

    if (error) {
      throw error;
    }

    if (result) {
        const transcript = result.results.channels[0].alternatives[0].transcript;
        const language = result.results.channels[0].detected_language || 'en';
        return {
            captions: transcript,
            language: language,
        };
    } else {
         throw new Error("No result from Deepgram API.");
    }
  } catch (error) {
    console.error('Deepgram API Error:', error);
    throw new Error(
      'The AI model failed to transcribe the video. This can happen with unsupported audio formats or network issues.'
    );
  }
}
