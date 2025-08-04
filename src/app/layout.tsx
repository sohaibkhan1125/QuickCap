import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'QuickCap: Instant AI Video Captions & Subtitles | Free & Accurate',
  description: 'Generate accurate subtitles for your videos in seconds with QuickCap\'s free AI caption generator. Translate to multiple languages and download in SRT or TXT format. Boost your video\'s accessibility and reach today!',
  keywords: [
    'video captions',
    'subtitle generator',
    'ai caption generator',
    'free subtitle generator',
    'auto subtitle',
    'srt generator',
    'video transcription',
    'add subtitles to video',
    'caption generator free',
    'ai subtitles',
    'automatic captions',
    'closed captions',
    'video accessibility',
    'caption video',
    'generate srt file',
    'txt subtitles',
    'video to text',
    'speech to text video',
    'translate subtitles',
    'multi-language captions',
    'seo for videos',
    'video content accessibility',
    'mp4 subtitles',
    'mov subtitles',
    'avi subtitles',
    'online captioning tool',
    'quick captions',
    'fast subtitles',
    'captioning service',
    'subtitle editor',
    'social media captions',
    'youtube captions',
    'instagram video subtitles',
    'caption maker',
    'subtitle maker',
    'ai video tools',
    'content creation tools'
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
