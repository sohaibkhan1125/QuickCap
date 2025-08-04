import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | QuickCap',
    description: "Understand how QuickCap handles your data. Our privacy policy details the information we collect, how it's used, and the measures we take to protect your video files and personal information.",
    keywords: [
        'QuickCap privacy policy',
        'data privacy',
        'video data security',
        'user information',
        'captioning service privacy',
        'how we use your data',
        'is QuickCap safe',
    ],
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2">Last updated: July 29, 2024</p>
          
          <div className="space-y-8 mt-8 text-foreground/90">
            <div>
              <h2 className="font-headline text-2xl font-bold mt-8 mb-2">1. Introduction</h2>
              <p>
                Welcome to QuickCap. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold mt-8 mb-2">2. Information We Collect</h2>
              <p>
                We may collect information about you in a variety of ways. The information we may collect on the Service includes:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4 mt-2">
                  <li><strong>Video Files:</strong> We temporarily process the video files you upload to generate captions. We do not store your videos after the captioning process is complete.</li>
                  <li><strong>Usage Data:</strong> We may automatically collect usage data when you access the Service, such as your IP address, browser type, and pages visited.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold mt-8 mb-2">3. Use of Your Information</h2>
              <p>
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Service to:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4 mt-2">
                  <li>Generate captions for your uploaded videos.</li>
                  <li>Monitor and analyze usage and trends to improve your experience with the Service.</li>
                  <li>Maintain the security and operation of our Service.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold mt-8 mb-2">4. Disclosure of Your Information</h2>
              <p>
                We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. Your video content is processed by our AI service provider for the sole purpose of generating captions and is subject to their privacy policies.
              </p>
            </div>
            
            <div>
              <h2 className="font-headline text-2xl font-bold mt-8 mb-2">5. Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold mt-8 mb-2">6. Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
