import { LyricsDisplay } from '@/components/lyrics-display';

export default function Home() {
  const audioUrl = process.env.NEXT_PUBLIC_AUDIO_URL || '';

  return <LyricsDisplay audioUrl={audioUrl} />;
}
