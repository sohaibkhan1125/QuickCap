"use client";

import { useState, useTransition } from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { auth, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '@/components/ui/spinner';
import { Camera } from 'lucide-react';

export function ProfileForm() {
    const [user, loading, error] = useAuthState(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const { toast } = useToast();

    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [isNamePending, startNameTransition] = useTransition();
    const [isPhotoPending, startPhotoTransition] = useTransition();

    const handleNameUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user || !displayName || displayName === user.displayName) return;

        startNameTransition(async () => {
            const success = await updateProfile({ displayName });
            if (success) {
                toast({ title: "Success", description: "Your name has been updated." });
            } else {
                 toast({
                    variant: "destructive",
                    title: "Error",
                    description: updateError?.message || "Failed to update your name.",
                });
            }
        });
    };

    const handlePhotoUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;
        
        startPhotoTransition(async () => {
             const storageRef = ref(storage, `avatars/${user.uid}/${file.name}`);
             try {
                await uploadBytes(storageRef, file);
                const photoURL = await getDownloadURL(storageRef);
                const success = await updateProfile({ photoURL });

                if (success) {
                    toast({ title: "Success", description: "Your profile picture has been updated." });
                } else {
                     toast({
                        variant: "destructive",
                        title: "Error",
                        description: updateError?.message || "Failed to update profile picture.",
                    });
                }
             } catch (err) {
                 toast({
                    variant: "destructive",
                    title: "Upload Error",
                    description: "Failed to upload your new profile picture.",
                });
             }
        });
    };
    
    if (loading) {
        return <div className="flex justify-center"><Spinner className="h-8 w-8" /></div>;
    }

    if (error) {
        return <p className="text-destructive text-center">Error: {error.message}</p>;
    }
    
    if (!user) {
         return <p className="text-center">Please log in to view your profile.</p>;
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative group">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user.photoURL ?? undefined} />
                            <AvatarFallback className="text-3xl">
                                {user.email?.[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <Label htmlFor="photo-upload" className="absolute inset-0 bg-black/50 flex items-center justify-center text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            {isPhotoPending ? <Spinner /> : <Camera className="h-8 w-8" />}
                        </Label>
                        <Input id="photo-upload" type="file" accept="image/*" className="sr-only" onChange={handlePhotoUpdate} disabled={isPhotoPending} />
                    </div>
                    <div className="text-center sm:text-left">
                        <CardTitle className="text-2xl">{user.displayName || 'New User'}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <form onSubmit={handleNameUpdate} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input 
                            id="displayName" 
                            value={displayName} 
                            onChange={(e) => setDisplayName(e.target.value)}
                            disabled={isNamePending}
                        />
                    </div>
                    <Button type="submit" disabled={isNamePending || displayName === user.displayName}>
                        {isNamePending && <Spinner className="mr-2" />}
                        Save Changes
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
