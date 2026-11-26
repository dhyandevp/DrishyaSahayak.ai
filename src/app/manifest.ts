import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Drishya Sahayak V1 — AI Visual Assistant',
    short_name: 'Drishya Sahayak',
    description:
      'Free, open-source Python desktop application combining real-time YOLOv8 object detection and Google Gemini 2.5 Flash for the visually impaired.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDFAF7',
    theme_color: '#FDFAF7',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/og-image.png',
        sizes: '1200x630',
        type: 'image/png',
      },
    ],
  };
}
