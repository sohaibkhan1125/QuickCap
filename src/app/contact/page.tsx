import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
                <div className="text-center mb-10">
                <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">Get in Touch</h1>
                <p className="text-lg text-muted-foreground mt-2">Have a question or feedback? We'd love to hear from you.</p>
                </div>
                <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message..." className="min-h-[150px]" />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
                </form>
            </div>
        </div>
    </div>
  );
}
