'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';

const Typewriter = ({ text, delay, onComplete }: { text: string; delay: number; onComplete?: () => void }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isTyping = useRef(false);
  const soundInterval = useRef<NodeJS.Timeout | null>(null);
  const hasUserInteracted = useRef(false);

  // Initialize audio after user interaction
  const initAudio = useCallback(() => {
    if (!hasUserInteracted.current) {
      hasUserInteracted.current = true;
      audioRef.current = new Audio('/typerwritter.mp3');
      audioRef.current.volume = 0.2; // Lower the volume a bit
      // Set start time to 5 seconds to skip the initial delay
      audioRef.current.currentTime = 5;
      // Preload the audio
      audioRef.current.load();
    }
  }, []);

  // Set up user interaction listener
  useEffect(() => {
    const handleFirstInteraction = () => {
      initAudio();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (soundInterval.current) {
        clearInterval(soundInterval.current);
      }
    };
  }, [initAudio]);

  // Handle typing effect with sound
  useEffect(() => {
    if (currentIndex < text.length) {
      isTyping.current = true;
      
      // Play the typewriter sound in a loop while typing
      const playSound = () => {
        if (audioRef.current && isTyping.current) {
          // Reset and play the sound
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(e => {
            console.error('Error playing sound:', e);
            // If autoplay was prevented, try to initialize audio again
            if (e.name === 'NotAllowedError') {
              initAudio();
            }
          });
        }
      };
      
      // Play sound at a reasonable rate for typing
      soundInterval.current = setInterval(playSound, Math.max(50, delay * 0.8));
      
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => {
        clearTimeout(timeout);
        if (soundInterval.current) {
          clearInterval(soundInterval.current);
        }
        // Don't pause here to allow for continuous typing sound
      };
    } else if (!isComplete) {
      isTyping.current = false;
      setIsComplete(true);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (soundInterval.current) {
        clearInterval(soundInterval.current);
      }
      if (onComplete) onComplete();
    }
  }, [currentIndex, delay, text, isComplete, onComplete, initAudio]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      isTyping.current = false;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (soundInterval.current) {
        clearInterval(soundInterval.current);
      }
    };
  }, []);

  return <span>{currentText}</span>;
};

export default function SecretsPage() {
  const router = useRouter();
  const [showLetter, setShowLetter] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  const letterContent = `It's been a while, and I've often found myself thinking about writing to you — not because anything urgent needed saying, but because some thoughts don't really go away until they're given a voice.

You probably never realized it, but through the chaos of adjusting to college life, you became one of the few constants that made things feel a little clearer. In your own way — through our talks, the way you'd look at things, and even the moments of silence we shared — you gave me a sense of direction. You made me reflect on what matters, what doesn't, and how to choose my own path without losing myself along the way. That kind of impact doesn't just fade with time or distance.

I know things changed. And maybe it seemed abrupt, or even distant at times — but nothing about it was careless. The truth is, when something or someone becomes deeply important to you, there's a strange fear that steps in: a fear of overstepping, of misplacing what was once light and easy. Sometimes we step back not because we want less, but because we value what is too much to risk breaking it. So yes, I chose silence for a while — not because I stopped caring, but because I cared a little too much.

And I'll admit — even with everything pointing to a clear boundary, there's a part of me that still quietly holds onto the rare moments we spoke, as if they held something more. Maybe it's naïve. Or maybe it's just what hearts do when they've felt something real, even briefly. That tiny hope lingers — not in expectation, but in quiet appreciation.

All said and done, I hope you always keep being exactly who you are — thoughtful, wildly creative, occasionally delightfully unpredictable. You're capable of more than you even realize, and I hope you keep chasing joy, throwing away the weight of anything that dims your light.

Whatever road you walk, I'll be somewhere on the sidelines, silently rooting for you. And more than anything, I hope you keep smiling — not for anyone else, but for yourself.`;

  const handleLetterComplete = () => {
    setShowSignature(true);
    // Show video after a short delay
    setTimeout(() => {
      setShowVideo(true);
    }, 1000);
  };

  useEffect(() => {
    // Start the letter animation after a short delay
    const timer = setTimeout(() => {
      setShowLetter(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 relative overflow-x-hidden">
      {/* Paper Texture Overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29-22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23a78bfa\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          {/* Letter Container */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-16 h-16 opacity-30">
              <svg viewBox="0 0 100 100" className="w-full h-full text-purple-300">
                <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
              </svg>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-16 h-16 opacity-30">
              <svg viewBox="0 0 100 100" className="w-full h-full text-pink-300">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </svg>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-8 md:p-12 border border-amber-200 relative overflow-hidden">
              {/* Ink Blot Decoration */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 left-10 w-32 h-32 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -top-8 left-20 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

              <div className="relative z-10">
                {/* Date */}
                <div className="text-right text-sm text-amber-600 mb-6 font-mono">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>

                {/* Greeting */}
                <h2 className="text-2xl md:text-3xl font-serif font-medium text-amber-900 mb-8 border-b border-amber-200 pb-2">
                  Dear V,
                </h2>

                {/* Letter Content */}
                <div className="text-amber-900 leading-relaxed space-y-4 font-serif">
                  {showLetter ? (
                    <Typewriter 
                      text={letterContent} 
                      delay={15} 
                      onComplete={handleLetterComplete}
                    />
                  ) : (
                    <div className="h-4 w-4 rounded-full bg-amber-400 animate-pulse"></div>
                  )}
                </div>

                {/* Signature */}
                <AnimatePresence>
                  {showSignature && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="mt-12 pt-4 border-t border-amber-200 relative"
                    >
                      <div className="text-amber-900 font-serif italic">Always,</div>
                      <div className="mt-2">
                        <div className="text-3xl font-dancing-script text-amber-800">
                          Magizhan
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Video Section - Integrated with letter */}
          <AnimatePresence>
            {showVideo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-8 w-full max-w-2xl mx-auto"
              >
                <div className="w-full max-w-2xl mx-auto bg-black/5 rounded-lg shadow-lg overflow-hidden">
                  <div className="relative pt-[56.25%] bg-black/10"> {/* 16:9 Aspect Ratio */}
                    <video 
                      key="video-player"
                      autoPlay 
                      loop 
                      muted
                      playsInline
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Video error:', e);
                        const target = e.target as HTMLVideoElement;
                        console.log('Video error details:', {
                          readyState: target.readyState,
                          networkState: target.networkState,
                          error: target.error,
                          currentSrc: target.currentSrc,
                          videoWidth: target.videoWidth,
                          videoHeight: target.videoHeight
                        });
                        setVideoError('Failed to load video. Please try using a different browser or check the console for details.');
                      }}
                      onLoadedData={() => {
                        console.log('Video loaded successfully');
                        setVideoError(null);
                      }}
                      onPlay={() => console.log('Video started playing')}
                      onPause={() => console.log('Video paused')}
                      onStalled={() => console.log('Video playback stalled')}
                      onWaiting={() => console.log('Video waiting for data')}
                    >
                      <source src="/secret.mov" type="video/quicktime" />
                      <source src="/secret.mov" type="video/mp4" />
                      <source src="/secret.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    {videoError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-red-50/80 p-4">
                        <p className="text-red-600 text-center">
                          {videoError}<br />
                          <span className="text-sm text-red-500">(Tried loading from: /secret.mov)</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Continue Button */}
                <div className="mt-8 text-center">
                  <button
                    onClick={() => router.push('/atlast')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Continue to Finale
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back Button */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
