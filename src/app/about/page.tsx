import Image from "next/image";
import firstImage from "../First Image.png";

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            Making Video Accessible
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">
            We are on a mission to make video content more accessible and engaging for everyone, everywhere.
          </p>
        </div>
        <div className="max-w-4xl mx-auto mt-12 md:mt-16 grid gap-8 md:grid-cols-2 lg:gap-12">
            <div data-ai-hint="mission abstract">
                <Image src={firstImage} alt="Our Mission" className="rounded-lg object-cover" />
            </div>
            <div className="flex flex-col justify-center">
                <h2 className="font-headline text-3xl font-bold">Our Story</h2>
                <p className="mt-4 text-muted-foreground">
                QuickCap started with a simple idea: what if generating accurate captions for videos could be effortless? In today's digital world, video is how we connect, learn, and share. However, a vast amount of video content remains inaccessible to the deaf and hard-of-hearing community, and many viewers watch on mute.
                </p>
                <p className="mt-4 text-muted-foreground">
                Leveraging the latest advancements in artificial intelligence, we've built a platform that is not only powerful but also incredibly easy to use.
                </p>
            </div>
        </div>
        <div className="max-w-4xl mx-auto mt-12 md:mt-16 grid gap-8 md:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center order-last md:order-first">
                <h2 className="font-headline text-3xl font-bold">Our Technology</h2>
                <p className="mt-4 text-muted-foreground">
                Our AI gets to work, automatically detecting the language and transcribing audio with high accuracy. Our goal is to empower creators, marketers, educators, and individuals to enhance their video content, reach a wider audience, and create a more inclusive viewing experience.
                </p>
                 <p className="mt-4 text-muted-foreground">
                We believe in the power of technology to break down barriers, and with QuickCap, we're taking a step towards a more accessible future.
                </p>
            </div>
            <div data-ai-hint="technology abstract" className="order-first md:order-last">
                 <img src="https://placehold.co/600x400.png" alt="Our Technology" className="rounded-lg object-cover" />
            </div>
        </div>
      </div>
    </div>
  );
}
