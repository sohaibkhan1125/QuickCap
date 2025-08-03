"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WavesIcon, Menu, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


export function Header() {
  const [user, loading] = useAuthState(auth);

  const handleSignOut = async () => {
    await signOut(auth);
  };
  
  const getInitials = (email: string | null | undefined) => {
    if (!email) return '';
    return email.substring(0, 2).toUpperCase();
  }

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
        {!loading && (
          <>
            {user ? (
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? ''} />
                      <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName ?? 'User'}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" className="hidden md:inline-flex" asChild><Link href="/login">Log In</Link></Button>
                <Button className="hidden md:inline-flex" asChild><Link href="/signup">Sign Up</Link></Button>
              </>
            )}
          </>
        )}
        
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
                 {!user ? (
                   <>
                    <Button variant="outline" asChild><Link href="/login">Log In</Link></Button>
                    <Button asChild><Link href="/signup">Sign Up</Link></Button>
                   </>
                 ) : (
                    <Button onClick={handleSignOut}>Log Out</Button>
                 )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
