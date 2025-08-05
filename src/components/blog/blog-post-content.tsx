import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function BlogPostContent() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10 text-foreground">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold font-headline mb-8 leading-tight">
        The Silent Revolution: How AI is Finally Making Video Accessible to Everyone
      </h1>

      {/* Introduction */}
      <h2 className="text-2xl md:text-3xl font-semibold mt-10 mb-4 font-headline">
        Introduction: The Unseen Barrier in a Visual World
      </h2>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        Have you ever scrolled through social media in a quiet place—the library, a waiting room, late at night—and skipped a video because you couldn't turn the sound on? ...
      </p>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        Video is the undisputed king of online content. ...
      </p>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        For years, creating accessible video was a painful, manual process. ...
      </p>

      {/* Benefits */}
      <h2 className="text-2xl md:text-3xl font-semibold mt-10 mb-4 font-headline">
        More Than Just Words: The Transformative Power of AI Captions
      </h2>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        So, what does this AI-driven change actually look like? ...
      </p>

      <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3">
        Breaking Down Sound Barriers
      </h3>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        The most obvious benefit is for individuals who are Deaf or hard-of-hearing. ...
      </p>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        However, the benefits extend much further. ...
      </p>

      <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3">
        Unlocking Global Audiences with Translation
      </h3>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        The internet has erased geographical borders, but language barriers remain. ...
      </p>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        This capability is a game-changer for creators and businesses. ...
      </p>
      <ul className="list-disc list-inside text-base md:text-lg mb-4 space-y-2">
        <li><strong>Expand Your Reach:</strong> Tap into new international markets ...</li>
        <li><strong>Increase Engagement:</strong> Viewers are more likely ...</li>
        <li><strong>Build a Global Community:</strong> Foster a diverse and connected audience ...</li>
      </ul>

      <p className="text-base md:text-lg leading-relaxed mb-4">
        Suddenly, your content isn't just for your local audience; it's for the world.
      </p>

      <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3">
        Boosting SEO and Discoverability
      </h3>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        Here’s a benefit that many creators overlook: search engines can’t watch videos. ...
      </p>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        When you add a full transcript or a caption file ...
      </p>

      {/* How It Works */}
      <h2 className="text-2xl md:text-3xl font-semibold mt-10 mb-4 font-headline">
        Behind the Curtain: How Does AI Actually Do It?
      </h2>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        It all feels a bit like magic, doesn't it? ...
      </p>
      <ol className="list-decimal list-inside text-base md:text-lg mb-4 space-y-2">
        <li>
          <strong>Audio Extraction:</strong> First, the system isolates the audio ...
        </li>
        <li>
          <strong>Speech-to-Text (STT) Conversion:</strong> The audio is fed into ...
        </li>
        <li>
          <strong>Punctuation and Formatting:</strong> The raw text is then processed ...
        </li>
        <li>
          <strong>Timestamping and Synchronization:</strong> Finally, the system aligns ...
        </li>
      </ol>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        This entire pipeline, which used to take hours ...
      </p>

      {/* Conclusion */}
      <h2 className="text-2xl md:text-3xl font-semibold mt-10 mb-4 font-headline">
        Conclusion: The Future is Accessible, and It's Powered by AI
      </h2>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        We are at a pivotal moment in the history of digital content. ...
      </p>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        Remember that creating <strong>inclusive content</strong> is no longer a technical hurdle. ...
      </p>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        The question is no longer <em>if</em> you should make your videos accessible, but how quickly you can start. ...
      </p>

      {/* CTA */}
      <div className="text-center bg-muted dark:bg-card/50 p-8 rounded-lg my-12">
        <h3 className="text-2xl font-bold font-headline">Ready to Make Your Content Accessible?</h3>
        <p className="text-lg text-muted-foreground mt-2">
          Don't let your message get lost in silence. Start creating fully accessible videos today with QuickCap.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/">Try QuickCap for Free</Link>
        </Button>
      </div>
    </section>
  );
}
