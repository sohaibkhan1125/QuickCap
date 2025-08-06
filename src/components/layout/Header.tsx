"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WavesIcon, Menu, LogOut, User } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from 'react';

export function Header() {
  const [user] = useAuthState(auth);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);


  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <WavesIcon className="h-6 w-6 text-primary" />
        <span className="font-headline text-xl font-bold ml-2">QuickCap</span>
      </Link>
      <nav className="ml-auto hidden md:flex gap-4 sm:gap-6 items-center">
        <Link href="/" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
          Home
        </Link>
        <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
          About
        </Link>
        <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
          Blog
        </Link>
        <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
          Contact
        </Link>
      </nav>
      <div className="ml-auto md:ml-4 flex gap-2 items-center">
        {hasMounted && (
            user ? (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={user.photoURL || undefined} />
                    <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            ) : (
            <>
                <Button variant="outline" className="hidden md:inline-flex" asChild>
                <Link href="/login">Log In</Link>
                </Button>
                <Button className="hidden md:inline-flex" asChild>
                <Link href="/signup">Sign Up</Link>
                </Button>
            </>
            )
        )}
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
                <SheetTitle>
                    <Link href="/" className="flex items-center justify-center" prefetch={false}>
                        <WavesIcon className="h-6 w-6 text-primary" />
                        <span className="font-headline text-xl font-bold ml-2">QuickCap</span>
                    </Link>
                </SheetTitle>
                <SheetDescription className="sr-only">
                    Mobile navigation menu
                </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 p-4">
              <Link href="/" className="text-lg font-medium hover:text-primary transition-colors" prefetch={false}>
                Home
              </Link>
              <Link href="/about" className="text-lg font-medium hover:text-primary transition-colors" prefetch={false}>
                About
              </Link>
              <Link href="/blog" className="text-lg font-medium hover:text-primary transition-colors" prefetch={false}>
                Blog
              </Link>
              <Link href="/contact" className="text-lg font-medium hover:text-primary transition-colors" prefetch={false}>
                Contact
              </Link>
              <div className="border-t pt-4 mt-2 flex flex-col gap-2">
                 <Link href="/terms-and-conditions" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
                    Terms & Conditions
                </Link>
                 <Link href="/privacy-policy" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
                    Privacy Policy
                </Link>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                {hasMounted && !user && (
                    <>
                     <Button variant="outline" className="w-full" asChild>
                        <Link href="/login">Log In</Link>
                     </Button>
                     <Button className="w-full" asChild>
                        <Link href="/signup">Sign Up</Link>
                     </Button>
                    </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
