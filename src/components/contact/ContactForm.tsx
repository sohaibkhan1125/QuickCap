"use client";

import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';

export function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) {
        return;
    }

    // Basic form validation
    const name = (form.current.elements.namedItem('user_name') as HTMLInputElement)?.value;
    const email = (form.current.elements.namedItem('user_email') as HTMLInputElement)?.value;
    const message = (form.current.elements.namedItem('message') as HTMLTextAreaElement)?.value;

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
    <form ref={form} onSubmit={sendEmail} className="space-y-6">
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
    <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
    </Button>
    </form>
  );
}
