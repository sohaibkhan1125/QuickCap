'use server';

import { autoDetectLanguage, AutoDetectLanguageInput } from '@/ai/flows/auto-detect-language';

const MOCK_SRT_CAPTIONS = `1
00:00:01,234 --> 00:00:03,456
Hello, and welcome to our demonstration.

2
00:00:04,567 --> 00:00:06,789
Today, we are showcasing the power of AI.

3
00:00:07,111 --> 00:00:09,888
This is CaptionWave, automatically generating subtitles for you.

4
00:00:10,500 --> 00:00:12,900
We hope you enjoy the experience.
`;

const MOCK_TXT_CAPTIONS = MOCK_SRT_CAPTIONS.replace(/(\d+\n\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}\n)/g, '').replace(/\n\n/g, '\n').trim();

export async function generateCaptionsAction(input: AutoDetectLanguageInput) {
  try {
    // Simulate initial processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = await autoDetectLanguage(input);

    // Simulate caption generation time after language detection
    await new Promise(resolve => setTimeout(resolve, 2500));

    return {
      success: true,
      data: {
        language: result.languageCode,
        srt: MOCK_SRT_CAPTIONS,
        txt: MOCK_TXT_CAPTIONS,
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
