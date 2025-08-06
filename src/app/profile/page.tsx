import type { Metadata } from 'next';
import { ProfileForm } from '@/components/profile/ProfileForm';

export const metadata: Metadata = {
    title: 'My Profile | QuickCap',
    description: "Manage your QuickCap account details. Update your name, change your profile picture, and view your account information.",
    keywords: [
        'my profile',
        'account settings',
        'user profile',
        'update profile',
        'change avatar',
    ],
};

export default function ProfilePage() {
    return (
        <div className="py-12 md:py-20 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">My Profile</h1>
                        <p className="text-lg text-muted-foreground mt-2">Update your account information.</p>
                    </div>
                    <ProfileForm />
                </div>
            </div>
        </div>
    );
}
