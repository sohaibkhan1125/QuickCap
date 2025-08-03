import Link from "next/link"
import { Twitter, Facebook, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">&copy; 2024 QuickCap. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="text-sm hover:text-primary underline-offset-4 transition-colors" prefetch={false}>
              Privacy Policy
            </Link>
          </nav>
          <div className="flex gap-4">
            <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
