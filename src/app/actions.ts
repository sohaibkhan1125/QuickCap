'use server';

import { autoCaption, AutoCaptionInput } from '@/ai/flows/auto-caption-flow';
import { translateText, TranslateInput } from '@/ai/flows/translate-flow';
import { generateSpeech, GenerateSpeechInput } from '@/ai/flows/text-to-speech-flow';
import { z } from 'zod';
import { getFirebaseAuth } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';

function srtTimestamp(seconds: number) {
    const date = new Date(0);
    date.setSeconds(seconds);
    const time = date.toISOString().substr(11, 12);
    return time.replace('.', ',');
}

function toSrt(captions: string): string {
    const lines = captions.split('\n').filter(line => line.trim() !== '');
    let srt = '';
    let startTime = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // Simple duration heuristic: 2 seconds base + 0.1s per character
        const duration = 2 + (line.length / 10);
        const endTime = startTime + duration;
        srt += `${i + 1}\n`;
        srt += `${srtTimestamp(startTime)} --> ${srtTimestamp(endTime)}\n`;
        srt += `${line}\n\n`;
        startTime = endTime;
    }
    return srt;
}

function toTxt(captions: string): string {
    return captions;
}


export async function generateCaptionsAction(input: AutoCaptionInput) {
  try {
    const result = await autoCaption(input);

    return {
      success: true,
      data: {
        language: result.language,
        captions: result.captions,
        srt: toSrt(result.captions),
        txt: toTxt(result.captions),
      },
    };
  } catch (error: any) {
    console.error('Error generating captions:', error);
    return {
      success: false,
      error: error.message || 'Failed to process the video. The AI model might not support the audio characteristics. Please try a different video.',
    };
  }
}

export async function translateCaptionsAction(input: TranslateInput) {
    try {
        const result = await translateText(input);
        return {
            success: true,
            data: {
                captions: result.translatedText,
                srt: toSrt(result.translatedText),
                txt: toTxt(result.translatedText),
            }
        };
    } catch (error: any) {
        console.error('Error translating captions:', error);
        return {
            success: false,
            error: error.message || 'Failed to translate captions.',
        };
    }
}

export async function generateAudioAction(input: GenerateSpeechInput) {
    try {
        const result = await generateSpeech(input);
        return {
            success: true,
            data: {
                audioDataUri: result.audioDataUri,
            }
        };
    } catch (error: any) {
        console.error('Error generating audio:', error);
        return {
            success: false,
            error: error.message || 'Failed to generate audio.',
        };
    }
}


const UpdateProfileSchema = z.object({
    uid: z.string(),
    displayName: z.string().optional(),
    photoURL: z.string().optional(),
});

export async function updateProfileAction(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const result = UpdateProfileSchema.safeParse(rawData);

    if (!result.success) {
        return { success: false, error: 'Invalid data provided.' };
    }
    
    const { uid, displayName, photoURL } = result.data;
    
    try {
        const auth = getFirebaseAuth();
        await auth.updateUser(uid, {
            ...(displayName && { displayName }),
            ...(photoURL && { photoURL }),
        });

        // Revalidate the profile page to show the new data
        revalidatePath('/profile');
        
        return { success: true };
    } catch (error: any) {
        console.error('Error updating profile:', error);
        return { success: false, error: error.message || 'Failed to update profile.' };
    }
}