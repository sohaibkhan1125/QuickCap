import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/blog-data';

type Props = {
  params: { slug: string };
};

// Find the post by slug
function getPostBySlug(slug: string) {
    return blogPosts.find((post) => post.slug === slug);
}

// Generate metadata for the page
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | QuickCap Blog`,
    description: post.description,
    keywords: post.keywords,
  };
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
      slug: post.slug,
    }));
}


export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-12 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4">

        {/* Title */}
        <h1 className="font-headline text-center text-4xl md:text-5xl font-bold tracking-tighter max-w-4xl mx-auto">
            {post.title}
        </h1>

        {/* Featured Image */}
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden my-8 md:my-12">
            <Image
                src={post.image}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={post.imageHint}
                className="bg-muted"
            />
        </div>
        
        {/* Article Content */}
        {post.content}
        
      </div>
    </div>
  );
}
