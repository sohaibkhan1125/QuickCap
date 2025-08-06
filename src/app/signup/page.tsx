"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateUserWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createUserWithEmailAndPassword, emailUser, emailLoading, emailError] = useCreateUserWithEmailAndPassword(auth);
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(email, password);
    };

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);


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
                    <h1 className="text-3xl font-bold">Sign Up</h1>
                    <p className="text-balance text-muted-foreground">
                        Create an account to get started.
                    </p>
                </div>
                <div className="grid gap-4">
                     {emailError && (
                         <Alert variant="destructive">
                            <AlertDescription>
                                {emailError.message}
                            </AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSignup} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={emailLoading}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password" 
                                type="password" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={emailLoading}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={emailLoading}>
                            {emailLoading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </form>
                </div>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}
