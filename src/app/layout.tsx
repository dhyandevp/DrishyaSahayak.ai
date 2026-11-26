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
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FDFAF7' },
    { media: '(prefers-color-scheme: dark)', color: '#08080a' },
  ],
  colorScheme: 'light dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_META.url),
  title: {
    default: SITE_META.title,
    template: '%s | Drishya Sahayak',
  },
  description: SITE_META.description,
  applicationName: 'Drishya Sahayak',
  category: 'technology',
  keywords: [
    'Drishya Sahayak',
    'Visual Assistant',
    'AI accessibility app',
    'visually impaired assistant',
    'assistive vision AI',
    'YOLOv8 real-time detection',
    'Gemini 2.5 Flash vision',
    'open source Python accessibility',
    'voice visual aid',
    'screen reader companion',
    'OCR for blind',
    'smart visual aid software',
  ],
  authors: [{ name: 'Dhyandev P', url: LINKS.website }],
  creator: 'Dhyandev P',
  publisher: 'Drishya Sahayak',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Drishya Sahayak',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_META.url,
    siteName: 'Drishya Sahayak',
    title: SITE_META.title,
    description: SITE_META.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Drishya Sahayak V1 — Open Source AI Vision Assistant for the Visually Impaired',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_META.title,
    description: SITE_META.description,
    images: ['/og-image.png'],
    creator: '@dhyandevp',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_META.url}/#website`,
        url: SITE_META.url,
        name: 'Drishya Sahayak',
        description: SITE_META.description,
        publisher: {
          '@id': `${SITE_META.url}/#creator`,
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_META.url}/#software`,
        name: SITE_META.name,
        alternateName: 'Visual Assistant',
        description: SITE_META.description,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Windows, macOS, Linux',
        softwareVersion: '1.0.0',
        license: 'https://opensource.org/licenses/MIT',
        isAccessibleForFree: true,
        url: SITE_META.url,
        downloadUrl: LINKS.github,
        codeRepository: LINKS.github,
        screenshot: `${SITE_META.url}/og-image.png`,
        featureList: [
          'Real-time local YOLOv8 object detection',
          'Google Gemini 2.5 Flash scene description',
          'Offline pyttsx3 speech synthesis',
          'OCR optical character recognition for printed & handwritten text',
          'Conversational voice queries',
        ],
        author: {
          '@id': `${SITE_META.url}/#creator`,
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
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_META.url}/#creator`,
        name: 'Dhyandev P',
        url: LINKS.website,
        sameAs: [LINKS.creatorGithub, LINKS.linktree, LINKS.github],
      },
    ],
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
