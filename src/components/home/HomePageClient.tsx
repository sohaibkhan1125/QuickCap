"use client";

import { useState, useCallback, useMemo, ChangeEvent, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { UploadCloud, FileVideo, Copy, Download, Twitter, Linkedin, Check, AlertCircle, RefreshCw, Facebook } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { generateCaptionsAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Label } from '@/components/ui/label';

type Status = 'idle' | 'processing' | 'success' | 'error';
type CaptionResult = {
  language: string;
  srt: string;
  txt: string;
};

const HeroSection = ({ onFileSelect }: { onFileSelect: (file: File) => void }) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 text-center relative overflow-hidden">
        <div 
            className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 animate-hero-gradient"
            style={{backgroundSize: '400% 400%'}}
        />
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="font-headline tracking-tighter text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Instant Video Captions
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Upload your video and let our AI generate accurate, time-coded subtitles in seconds. Break barriers and make your content accessible to all.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild className="relative overflow-hidden">
                <label htmlFor="video-upload" className="cursor-pointer">
                    <UploadCloud className="mr-2 h-5 w-5" />
                    Upload Your Video Now
                    <input id="video-upload" type="file" className="sr-only" accept="video/mp4,video/quicktime,video/x-msvideo" onChange={handleFileChange} />
                </label>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Supports MP4, MOV, and AVI files.</p>
        </div>
      </div>
    </section>
  );
};

const ProcessingView = ({ progress, fileName }: { progress: number; fileName: string }) => {
  const statusText = useMemo(() => {
    if (progress < 20) return "Preparing upload...";
    if (progress < 50) return "Uploading & analyzing audio...";
    if (progress < 90) return "Generating captions...";
    return "Finalizing results...";
  }, [progress]);

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader className="items-center text-center">
          <CardTitle>Processing Your Video</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <FileVideo className="h-16 w-16 text-primary" />
          <p className="text-sm font-medium text-muted-foreground truncate max-w-full">{fileName}</p>
          <div className="w-full space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-center text-primary animate-pulse">{statusText}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SuccessView = ({ result, onReset, videoFileName }: { result: CaptionResult; onReset: () => void; videoFileName: string }) => {
    const { toast } = useToast();
    const [srtCaptions, setSrtCaptions] = useState(result.srt);
    const [txtCaptions, setTxtCaptions] = useState(result.txt);

    const handleCopy = (text: string, format: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to Clipboard!",
            description: `Your ${format} captions have been copied.`,
        });
    };

    const handleDownload = (text: string, format: 'srt' | 'txt') => {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${videoFileName.split('.').slice(0, -1).join('.')}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="w-full max-w-3xl px-4 py-12">
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-4 sm:mb-0">
                            <CardTitle className="flex items-center gap-2">
                                <Check className="h-8 w-8 text-green-500" />
                                Captions Generated!
                            </CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Detected Language:</span>
                            <Badge variant="secondary" className="uppercase">{result.language}</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="srt" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="srt">SRT Format</TabsTrigger>
                            <TabsTrigger value="txt">TXT Format</TabsTrigger>
                        </TabsList>
                        <TabsContent value="srt">
                            <Label htmlFor="srt-editor" className="sr-only">SRT Captions</Label>
                            <Textarea id="srt-editor" value={srtCaptions} onChange={(e) => setSrtCaptions(e.target.value)} className="mt-2 h-64 font-code text-xs" />
                            <div className="flex gap-2 mt-2">
                                <Button onClick={() => handleCopy(srtCaptions, "SRT")} variant="outline" size="sm"><Copy className="mr-2 h-4 w-4" />Copy</Button>
                                <Button onClick={() => handleDownload(srtCaptions, "srt")} variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Download .srt</Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="txt">
                            <Label htmlFor="txt-editor" className="sr-only">TXT Captions</Label>
                            <Textarea id="txt-editor" value={txtCaptions} onChange={(e) => setTxtCaptions(e.target.value)} className="mt-2 h-64 text-sm" />
                            <div className="flex gap-2 mt-2">
                                <Button onClick={() => handleCopy(txtCaptions, "TXT")} variant="outline" size="sm"><Copy className="mr-2 h-4 w-4" />Copy</Button>
                                <Button onClick={() => handleDownload(txtCaptions, "txt")} variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Download .txt</Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter className="flex-col sm:flex-row gap-4 items-center justify-between">
                     <Button onClick={onReset}><RefreshCw className="mr-2 h-4 w-4" />Generate Another</Button>
                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        Share:
                        <Button variant="ghost" size="icon" asChild>
                           <Link href={`https://twitter.com/intent/tweet?text=I%20just%20generated%20captions%20for%20my%20video%20with%20QuickCap!&url=${'https://quickcap.com'}`} target="_blank"><Twitter className="h-5 w-5" /></Link>
                        </Button>
                         <Button variant="ghost" size="icon" asChild>
                           <Link href={`https://www.facebook.com/sharer/sharer.php?u=${'https://quickcap.com'}`} target="_blank"><Facebook className="h-5 w-5" /></Link>
                        </Button>
                         <Button variant="ghost" size="icon" asChild>
                           <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${'https://quickcap.com'}&title=QuickCap`} target="_blank"><Linkedin className="h-5 w-5" /></Link>
                        </Button>
                     </div>
                </CardFooter>
            </Card>
        </div>
    );
};

const ErrorView = ({ error, onReset }: { error: string; onReset: () => void }) => (
    <div className="w-full max-w-md">
        <Card className="border-destructive">
            <CardHeader className="items-center text-center">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <CardTitle className="text-destructive">An Error Occurred</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <p className="text-muted-foreground">{error}</p>
            </CardContent>
            <CardFooter>
                <Button onClick={onReset} className="w-full"><RefreshCw className="mr-2 h-4 w-4" />Try Again</Button>
            </CardFooter>
        </Card>
    </div>
);


export function HomePageClient() {
  const [status, setStatus] = useState<Status>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<CaptionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');

  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'processing') {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + 1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [status]);


  const handleFileSelect = useCallback(async (file: File) => {
    if (!file) return;

    setFileName(file.name);
    setStatus('processing');
    setProgress(0);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
        const videoDataUri = reader.result as string;
        const actionResult = await generateCaptionsAction({ videoDataUri });
        
        setProgress(100);

        if (actionResult.success && actionResult.data) {
            setResult(actionResult.data);
            setStatus('success');
        } else {
            setError(actionResult.error || 'An unknown error occurred.');
            setStatus('error');
        }
    };
    reader.onerror = () => {
        setError('Failed to read the file.');
        setStatus('error');
    };
  }, []);
  
  const handleReset = useCallback(() => {
    setStatus('idle');
    setProgress(0);
    setResult(null);
    setError(null);
    setFileName('');
  }, []);

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      {status === 'idle' && <HeroSection onFileSelect={handleFileSelect} />}
      {status === 'processing' && <ProcessingView progress={progress} fileName={fileName} />}
      {status === 'success' && result && <SuccessView result={result} onReset={handleReset} videoFileName={fileName} />}
      {status === 'error' && error && <ErrorView error={error} onReset={handleReset} />}
    </div>
  );
}
