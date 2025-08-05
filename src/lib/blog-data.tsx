import React from 'react';
import { BlogPostContent } from '@/components/blog/blog-post-content';
import articleImage from '../app/Silent Revolution.png';

interface BlogPost {
    slug: string;
    title: string;
    description: string;
    image: any; // Changed to any to support static import
    imageHint: string;
    keywords: string[];
    content: React.ReactNode;
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'ai-video-accessibility-revolution',
        title: 'The Silent Revolution: How AI is Finally Making Video Accessible to Everyone',
        description: "Discover how AI is breaking down barriers with automatic captions, transcriptions, and more. Learn why AI video accessibility is not just a feature, but a necessity for reaching a global audience.",
        image: articleImage,
        imageHint: 'AI accessibility revolution',
        keywords: [
            'AI video accessibility',
            'automatic captions',
            'video transcription',
            'inclusive content',
            'AI subtitles',
            'accessible video content',
            'speech-to-text AI',
            'content creation trends',
            'digital inclusion'
        ],
        content: <BlogPostContent />,
    },
    // You can add more blog posts here in the future
];
