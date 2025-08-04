import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
    title: 'Contact QuickCap | Get in Touch for Support & Inquiries',
    description: "Have a question, feedback, or need support? Contact the QuickCap team. We're here to help you with all your video captioning needs. Reach out to us today!",
    keywords: [
        'contact QuickCap',
        'QuickCap support',
        'get in touch',
        'customer service',
        'feedback',
        'help with subtitles',
        'video captioning help',
        'contact us',
        'QuickCap feedback'
    ],
};

export default function ContactPage() {
    return (
        <div className="py-12 md:py-20 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">Get in Touch</h1>
                        <p className="text-lg text-muted-foreground mt-2">Have a question or feedback? We'd love to hear from you.</p>
                    </div>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
