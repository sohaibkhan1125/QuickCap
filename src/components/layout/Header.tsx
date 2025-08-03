"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WavesIcon, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'


export function Header() {
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
        <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
          Contact
        </Link>
        <Link href="/privacy-policy" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
          Privacy Policy
        </Link>
      </nav>
      <div className="ml-auto md:ml-4 flex gap-2 items-center">
        <SignedOut>
          <SignInButton mode="modal" afterSignInUrl="/">
            <Button variant="outline" className="hidden md:inline-flex">Log In</Button>
          </SignInButton>
          <SignUpButton mode="modal" afterSignUpUrl="/">
            <Button className="hidden md:inline-flex">Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 p-4">
              <Link href="/" className="text-lg font-medium hover:text-primary transition-colors" prefetch={false}>
                Home
              </Link>
              <Link href="/about" className="text-lg font-medium hover:text-primary transition-colors" prefetch={false}>
                About
              </Link>
              <Link href="/contact" className="text-lg font-medium hover:text-primary transition-colors" prefetch={false}>
                Contact
              </Link>
              <Link href="/privacy-policy" className="text-lg font-medium hover:text-primary transition-colors" prefetch={false}>
                Privacy Policy
              </Link>
              <div className="flex flex-col gap-2 mt-4">
                 <SignedOut>
                    <SignInButton mode="modal" afterSignInUrl="/">
                        <Button variant="outline" className="w-full">Log In</Button>
                    </SignInButton>
                    <SignUpButton mode="modal" afterSignUpUrl="/">
                        <Button className="w-full">Sign Up</Button>
                    </SignUpButton>
                 </SignedOut>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
