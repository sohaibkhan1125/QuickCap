'use server';

import { autoCaption, AutoCaptionInput } from '@/ai/flows/auto-caption-flow';

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
        const duration = Math.max(2, line.length / 10); // Simple duration heuristic
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
        language: result.languageCode,
        srt: toSrt(result.captions),
        txt: toTxt(result.captions),
      },
    };
  } catch (error) {
    console.error('Error generating captions:', error);
    return {
      success: false,
      error: 'Failed to process the video. The AI model might not support the audio characteristics. Please try a different video.',
    };
  }
}
