"use client";

import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!form.current) return;
    
    // Simple validation
    const formData = new FormData(form.current);
    const name = formData.get('user_name');
    const email = formData.get('user_email');
    const message = formData.get('message');

    if (!name || !email || !message) {
        toast({
            title: "Missing fields",
            description: "Please fill out all required fields.",
            variant: "destructive",
        });
        return;
    }


    setIsSubmitting(true);

    emailjs.sendForm(
      "service_dx1ia6d",
      "template_896wwxc",
      form.current,
      "N6DkZlXDyFgvcMSUV"
    )
    .then(
      (result) => {
        console.log("Message Sent:", result.text);
        toast({
            title: "Message Sent!",
            description: "Thank you for contacting us. We'll get back to you shortly.",
        });
        form.current?.reset();
      },
      (error) => {
        console.error("Error:", error.text);
        toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request. This can sometimes be a configuration issue. Please try again later.",
            variant: "destructive",
        })
      }
    ).finally(() => {
        setIsSubmitting(false);
    });
  };

  return (
    <div className="py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
                <div className="text-center mb-10">
                <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">Get in Touch</h1>
                <p className="text-lg text-muted-foreground mt-2">Have a question or feedback? We'd love to hear from you.</p>
                </div>
                <form ref={form} className="space-y-6">
                 <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="user_name" placeholder="John Doe" required />
                  </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="user_email" type="email" placeholder="john.doe@example.com" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" placeholder="Your message..." className="min-h-[150px]" required />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting} onClick={sendEmail}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                </form>
            </div>
        </div>
    </div>
  );
}
