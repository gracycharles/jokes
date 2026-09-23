import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'ShortsLens Studio - 10s Hollywood Clean Joke Video Prompts',
  description: 'Hollywood-style cinematic 10-second YouTube Shorts video prompt generator and studio with 50 innovative clean joke scripts, vertical framing, text overlays, and British voice narration preview.',
  openGraph: {
    title: 'ShortsLens Studio - 10s Hollywood Clean Joke Video Prompts',
    description: 'Hollywood-style cinematic 10-second YouTube Shorts video prompt generator and studio with 50 innovative clean joke scripts, vertical framing, text overlays, and British voice narration preview.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShortsLens Studio - 10s Hollywood Clean Joke Video Prompts',
    description: 'Hollywood-style cinematic 10-second YouTube Shorts video prompt generator and studio with 50 innovative clean joke scripts, vertical framing, text overlays, and British voice narration preview.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
