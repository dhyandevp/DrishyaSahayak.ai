import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Newsreader } from 'next/font/google';
import './globals.css';
import { LINKS, SITE_META } from '@/content';
import { AccessibilityProvider } from '@/components/accessibility/AccessibilityProvider';
import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider';

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-mono',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FDFAF7',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_META.url),
  title: {
    default: SITE_META.title,
    template: '%s | Drishya Sahayak',
  },
  description: SITE_META.description,
  keywords: [
    'Drishya Sahayak',
    'Visual Assistant',
    'AI accessibility app',
    'visually impaired assistant',
    'YOLOv8',
    'Gemini 2.5 Flash',
    'open source Python accessibility',
    'voice visual aid',
  ],
  authors: [{ name: 'Dhyandev P', url: LINKS.linktree }],
  creator: 'Dhyandev P',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_META.url,
    siteName: SITE_META.name,
    title: SITE_META.title,
    description: SITE_META.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_META.title,
    description: SITE_META.description,
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_META.name,
    alternateName: 'Visual Assistant',
    description: SITE_META.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Windows, macOS, Linux',
    softwareVersion: '1.0',
    license: 'https://opensource.org/licenses/MIT',
    isAccessibleForFree: true,
    url: SITE_META.url,
    downloadUrl: LINKS.github,
    codeRepository: LINKS.github,
    author: {
      '@type': 'Person',
      name: 'Dhyandev P',
      url: LINKS.linktree,
    },
    contributor: [
      {
        '@type': 'Person',
        name: 'Sreehid',
      },
      {
        '@type': 'Person',
        name: 'Ashirwad',
      },
    ],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AccessibilityProvider>
          <SmoothScrollProvider>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            {children}
          </SmoothScrollProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
