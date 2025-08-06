"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSignInWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, AuthError } from 'firebase/auth';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-1.5c-.83 0-1.5.67-1.5 1.5V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"/>
    </svg>
);


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInWithEmailAndPassword, emailUser, emailLoading, emailError] = useSignInWithEmailAndPassword(auth);
    const [user, loading] = useAuthState(auth);
    const [popupError, setPopupError] = useState<Error | null>(null);
    const [popupLoading, setPopupLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await signInWithEmailAndPassword(email, password);
    };

    const handleGoogleSignIn = async () => {
        setPopupLoading(true);
        setPopupError(null);
        try {
            const result = await signInWithPopup(auth, googleProvider);
             if (result.user) {
                router.push('/');
            }
        } catch (error: any) {
            // Don't show an error if the user closes the popup
            if ((error as AuthError).code !== 'auth/popup-closed-by-user') {
                setPopupError(error);
            }
        } finally {
            setPopupLoading(false);
        }
    }
    
    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    const anyError = emailError || popupError;
    const anyLoading = emailLoading || popupLoading || loading;

    if (loading) {
        return <div className="flex items-center justify-center h-screen"><p>Loading...</p></div>;
    }
    
    if (user) {
        return null;
    }


    return (
        <div className="flex items-center justify-center py-12 md:py-20 lg:py-24">
            <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-balance text-muted-foreground">
                        Enter your email below to login to your account
                    </p>
                </div>
                <div className="grid gap-4">
                    {anyError && (
                         <Alert variant="destructive">
                            <AlertDescription>
                                {anyError.message}
                            </AlertDescription>
                        </Alert>
                    )}
                    <Button variant="outline" onClick={handleGoogleSignIn} disabled={anyLoading}>
                        <GoogleIcon />
                        {popupLoading ? 'Logging in...' : 'Login with Google'}
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={anyLoading}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input 
                                id="password" 
                                type="password" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={anyLoading}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={anyLoading}>
                            {emailLoading ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>
                </div>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
