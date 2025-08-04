"use client";

import { useState, useCallback, useMemo, ChangeEvent, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { UploadCloud, FileVideo, Copy, Download, Twitter, Linkedin, Check, AlertCircle, RefreshCw, Facebook, Languages, Sparkles, PencilRuler } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { generateCaptionsAction, translateCaptionsAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { languages } from '@/lib/languages';
import { Skeleton } from '@/components/ui/skeleton';

type Status = 'idle' | 'processing' | 'success' | 'error';
type CaptionResult = {
  language: string;
  captions: string;
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
                    <input id="video-upload" type="file" className="sr-only" accept="video/mp4,video/quicktime,video/x-msvideo,video/avi" onChange={handleFileChange} />
                </label>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Supports MP4, MOV, and AVI files.</p>
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UploadCloud,
      title: "Upload Your Video",
      description: "Simply click the upload button and select any video file from your device. We support all major formats like MP4, MOV, and AVI."
    },
    {
      icon: Sparkles,
      title: "AI-Powered Generation",
      description: "Our advanced AI gets to work, analyzing and transcribing the audio from your video into highly accurate, time-coded captions."
    },
    {
      icon: Download,
      title: "Translate & Download",
      description: "Instantly translate your captions into over 20 languages. Edit them directly and download the final result as an SRT or TXT file."
    }
  ];

  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">How It Works</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">Get perfect captions in three simple steps.</p>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="grid gap-4 p-6 rounded-lg border hover:shadow-lg transition-shadow duration-300 animate-fade-in" style={{ animationDelay: `${index * 200}ms`}}>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
              </div>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
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
    const [currentCaptions, setCurrentCaptions] = useState(result.captions);
    const [srtCaptions, setSrtCaptions] = useState(result.srt);
    const [txtCaptions, setTxtCaptions] = useState(result.txt);
    const [isTranslating, setIsTranslating] = useState(false);
    
    const handleCopy = (text: string, format: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to Clipboard!",
            description: `Your ${format} captions have been copied.`,
        });
    };

    const handleDownload = (text: string, format: 'srt' | 'txt') => {
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${videoFileName.split('.').slice(0, -1).join('.')}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleLanguageChange = async (languageName: string) => {
        if (languageName === 'original') {
            setSrtCaptions(result.srt);
            setTxtCaptions(result.txt);
            setCurrentCaptions(result.captions);
            return;
        }

        setIsTranslating(true);
        const translationResult = await translateCaptionsAction({ text: result.captions, targetLanguage: languageName });
        setIsTranslating(false);

        if (translationResult.success && translationResult.data) {
            setSrtCaptions(translationResult.data.srt);
            setTxtCaptions(translationResult.data.txt);
            setCurrentCaptions(translationResult.data.captions);
            toast({
                title: "Translation Successful!",
                description: `Captions have been translated to ${languageName}.`,
            })
        } else {
            toast({
                title: "Translation Failed",
                description: translationResult.error,
                variant: "destructive",
            });
        }
    }

    return (
        <div className="w-full max-w-3xl px-4 py-12">
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                            <CardTitle className="flex items-center gap-2">
                                <Check className="h-8 w-8 text-green-500" />
                                Captions Generated!
                            </CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                             <span className="text-sm text-muted-foreground whitespace-nowrap">Detected Language:</span>
                            <Badge variant="secondary" className="uppercase">{result.language}</Badge>
                        </div>
                        <div className="w-full sm:w-auto">
                            <Select onValueChange={handleLanguageChange} defaultValue="original">
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <Languages className="mr-2 h-4 w-4"/>
                                    <SelectValue placeholder="Translate..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="original">Original Language</SelectItem>
                                    {languages.map(lang => (
                                        <SelectItem key={lang.code} value={lang.name}>{lang.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    { isTranslating ? (
                        <div className="space-y-4 mt-2">
                           <Skeleton className="h-8 w-1/3" />
                           <Skeleton className="h-64 w-full" />
                           <Skeleton className="h-9 w-48" />
                        </div>
                    ) : (
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
                    )}
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

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;

    if (status === 'processing') {
      let currentProgress = 0;
      setProgress(currentProgress);

      // Simulate initial progress quickly
      const timers = [
        setTimeout(() => setProgress(15), 500),
        setTimeout(() => setProgress(45), 2000),
        setTimeout(() => setProgress(85), 8000),
      ];
      
      // After 10 seconds, start a slower, indefinite progress simulation
      const finalProgressTimer = setTimeout(() => {
        progressInterval = setInterval(() => {
          setProgress(p => {
            if (p >= 95) {
              // It will hang at 95% and pulse until the process is truly complete
              return p;
            }
            return p + 1;
          });
        }, 1500); 
      }, 10000);

      return () => {
        timers.forEach(clearTimeout);
        clearTimeout(finalProgressTimer);
        clearInterval(progressInterval);
      };
    }
  }, [status]);


  const handleFileSelect = useCallback(async (file: File) => {
    if (!file) return;

    setFileName(file.name);
    setStatus('processing');
    setResult(null);
    setError(null);
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
    <div className="flex flex-col items-center justify-center flex-1 py-12">
      {status === 'idle' && (
        <>
          <HeroSection onFileSelect={handleFileSelect} />
          <HowItWorksSection />
        </>
      )}
      {status === 'processing' && <ProcessingView progress={progress} fileName={fileName} />}
      {status === 'success' && result && <SuccessView result={result} onReset={handleReset} videoFileName={fileName} />}
      {status === 'error' && error && <ErrorView error={error} onReset={handleReset} />}
    </div>
  );
}
