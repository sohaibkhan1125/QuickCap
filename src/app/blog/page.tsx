import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Blog | QuickCap',
    description: 'Explore articles on AI, video accessibility, content creation, and more. Stay updated with the latest trends and tips from the QuickCap team.',
    keywords: [
      'QuickCap blog',
      'AI video accessibility',
      'content creation tips',
      'video marketing',
      'subtitle trends',
    ],
};

export default function BlogIndexPage() {
  return (
    <div className="py-12 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
                From the Blog
            </h1>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
                Insights on AI, video accessibility, and content creation.
            </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <div className="relative w-full h-48">
                    <Image
                        src={post.image}
                        alt={post.title}
                        layout="fill"
                        style={{objectFit: 'cover'}}
                        className="bg-muted"
                    />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-xl font-bold group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3">
                    {post.description}
                  </p>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                    <div className="flex items-center font-semibold text-primary">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
