'use client';

import { useEffect, useState } from 'react';

interface LyricLine {
  time: number;
  text: string;
  color: 'pink' | 'cyan' | 'white';
}

const lyrics: LyricLine[] = [
  { time: 14.39, text: "I've never been so high", color: 'pink' },
  { time: 19.75, text: 'From sitting here just looking at you', color: 'pink' },
  { time: 25.13, text: "I'm swimming in your eyes", color: 'cyan' },
  { time: 30.47, text: 'I\'d let you drown me if you want to', color: 'cyan' },
  { time: 34.78, text: "You're the only light", color: 'white' },
  { time: 38.82, text: 'Left in the room', color: 'white' },
  { time: 41.13, text: 'How is it that I', color: 'white' },
  { time: 44.10, text: 'Get to be the one that gets to?', color: 'white' },
  { time: 49.46, text: 'Take you upstairs', color: 'pink' },
  { time: 52.17, text: 'Closer to heaven', color: 'pink' },
  { time: 54.84, text: 'Tell you how beautiful you are', color: 'pink' },
  { time: 60.14, text: 'Lips like a prayer', color: 'cyan' },
  { time: 62.56, text: 'Undone in your presence', color: 'cyan' },
  { time: 65.46, text: 'Worship your body in the dark', color: 'white' },
  { time: 69.94, text: "You're so soft", color: 'pink' },
  { time: 71.88, text: 'Nothing about you ever hurts me', color: 'pink' },
  { time: 75.13, text: "You're so soft", color: 'pink' },
  { time: 77.12, text: "I'm a lover at your mercy", color: 'pink' },
  { time: 86.45, text: 'The way you say my name', color: 'pink' },
  { time: 91.76, text: "The way you're taking off my t-shirt", color: 'pink' },
  { time: 97.10, text: 'I want you every day', color: 'cyan' },
  { time: 102.48, text: "The way I wouldn't change a thing", color: 'cyan' },
  { time: 106.18, text: 'About my baby girl', color: 'cyan' },
  { time: 110.75, text: 'How is it true', color: 'white' },
  { time: 113.35, text: "That there's a whole world", color: 'white' },
  { time: 115.88, text: "But I'm the only one that gets to", color: 'white' },
  { time: 121.40, text: 'Take you upstairs', color: 'pink' },
  { time: 124.12, text: 'Closer to heaven', color: 'pink' },
  { time: 126.73, text: 'Tell you how beautiful you are', color: 'pink' },
  { time: 132.09, text: 'Lips like a prayer', color: 'cyan' },
  { time: 134.62, text: 'Undone in your presence', color: 'cyan' },
  { time: 137.47, text: 'Worship your body in the dark', color: 'white' },
  { time: 141.88, text: "You're so soft", color: 'pink' },
  { time: 143.79, text: 'Nothing about you ever hurts me', color: 'pink' },
  { time: 147.13, text: "You're so soft", color: 'pink' },
  { time: 149.11, text: "I'm a lover at your mercy", color: 'pink' },
  { time: 163.15, text: "You're so soft", color: 'pink' },
  { time: 165.15, text: 'Nothing about you ever hurts me', color: 'pink' },
  { time: 168.55, text: "You're so soft", color: 'pink' },
  { time: 170.58, text: "I'm a lover at your mercy", color: 'pink' },
];

const colorClasses = {
  pink: 'text-pink-400',
  cyan: 'text-cyan-400',
  white: 'text-white',
};

interface LyricsDisplayProps {
  audioUrl?: string;
}

export function LyricsDisplay({ audioUrl = '' }: LyricsDisplayProps) {
  const [currentLyricIndex, setCurrentLyricIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useState<HTMLAudioElement | null>(null)[1];
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioUrl) return;

    const newAudio = new Audio(audioUrl);
    setAudio(newAudio);
    
    const updateTime = () => {
      setCurrentTime(newAudio.currentTime);
      
      // Find current lyric
      for (let i = lyrics.length - 1; i >= 0; i--) {
        if (newAudio.currentTime >= lyrics[i].time) {
          setCurrentLyricIndex(i);
          break;
        }
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoadedMetadata = () => setDuration(newAudio.duration);

    newAudio.addEventListener('timeupdate', updateTime);
    newAudio.addEventListener('play', handlePlay);
    newAudio.addEventListener('pause', handlePause);
    newAudio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      newAudio.removeEventListener('timeupdate', updateTime);
      newAudio.removeEventListener('play', handlePlay);
      newAudio.removeEventListener('pause', handlePause);
      newAudio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [audioUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-2">Soft</h1>
        <p className="text-xl text-gray-400">by LANY</p>
      </div>

      {/* Lyrics Container */}
      <div className="max-w-2xl w-full mb-12 h-64 flex flex-col justify-center space-y-4">
        {lyrics.map((lyric, index) => {
          const isActive = index === currentLyricIndex;
          const isPast = index < currentLyricIndex;
          const isFuture = index > currentLyricIndex;

          return (
            <div
              key={index}
              className={`transition-all duration-500 text-center font-light text-2xl ${
                isActive
                  ? `${colorClasses[lyric.color]} scale-110 opacity-100`
                  : isPast
                    ? 'text-gray-600 opacity-40'
                    : 'opacity-0 hidden'
              }`}
            >
              {lyric.text}
            </div>
          );
        })}
      </div>

      {/* Audio Player */}
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 border border-gray-700">
        {audioUrl ? (
          <audio
            key={audioUrl}
            className="w-full mb-4"
            controls
            onTimeUpdate={(e) => {
              setCurrentTime(e.currentTarget.currentTime);
              for (let i = lyrics.length - 1; i >= 0; i--) {
                if (e.currentTime >= lyrics[i].time) {
                  setCurrentLyricIndex(i);
                  break;
                }
              }
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          >
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <div className="w-full p-4 bg-gray-700 rounded text-center text-gray-300 mb-4">
            Menunggu URL audio...
          </div>
        )}

        {/* Time Display */}
        <div className="text-center text-sm text-gray-400">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Info */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        {audioUrl ? (
          <p>Nikmati lirik "Soft" yang disinkronisasi dengan musik</p>
        ) : (
          <p>Siapkan URL audio untuk memulai</p>
        )}
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
