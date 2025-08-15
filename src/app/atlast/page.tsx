'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

// Helper function to trigger file download
const downloadFile = (url: string, filename: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Background components (matches home page exactly)
const BackgroundElements = () => (
  <>
    {/* Dotted Background Pattern */}
    <div 
      className="absolute inset-0 opacity-25 pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle, #94a3b8 2px, transparent 2px)',
        backgroundSize: '40px 40px',
        backgroundPosition: '0 0, 20px 20px'
      }}
    />
    
    {/* Animated Floating Dots */}
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-2 h-2 bg-slate-400/15 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.1, 0.6, 0.1],
            scale: [0, 1, 1, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 10,
            repeat: Infinity,
            repeatType: 'loop',
            delay: Math.random() * 5,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  </>
);

const AtLastPage = () => {
  const router = useRouter();
  const { width, height } = useWindowSize();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showSignature, setShowSignature] = useState(true); // Start with true for testing, will be set to false in useEffect
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Auto confetti every 10 seconds
  useEffect(() => {
    const confettiInterval = setInterval(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }, 10000);

    // Initial confetti
    setShowConfetti(true);
    const initialTimeout = setTimeout(() => setShowConfetti(false), 5000);

    return () => {
      clearInterval(confettiInterval);
      clearTimeout(initialTimeout);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowContent(true), 500);
    // Show signature after 4-5 seconds
    const signatureTimer = setTimeout(() => {
      setShowSignature(true);
      setTimeout(() => setIsVisible(true), 100); // Small delay for animation
    }, 4500 + Math.random() * 1000);
    return () => {
      clearTimeout(timer);
      clearTimeout(signatureTimer);
    };
  }, []);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/music.mp3');
    audioRef.current.loop = true;
    
    // Auto-play with user interaction
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(error => console.log('Playback failed:', error));
        }
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Playback failed:', error);
        });
      }
    }
    setIsPlaying(!isPlaying);
  };

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate floating elements that avoid the center area
  const floatingElements = Array.from({ length: 8 }).map((_, i) => {
    // Generate positions that avoid the center 40% of the screen
    const getPosition = () => {
      const pos = Math.random() * 100;
      // If position is in center 40%, adjust it
      if (pos > 30 && pos < 70) {
        return Math.random() < 0.5 ? 25 : 75;
      }
      return pos;
    };
    
    return {
      id: i,
      size: Math.random() * 40 + 20,
      x: getPosition(),
      y: getPosition(),
      delay: Math.random() * 2,
      duration: 4 + Math.random() * 5,
      opacity: 0.08 + Math.random() * 0.12,
    };
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden relative">
      {/* Background elements (matches home page) */}
      <BackgroundElements />
      
      {/* Signature Badge */}
      <AnimatePresence>
        {showSignature && (
          <motion.div 
            className="fixed z-50 cursor-pointer"
            style={{
              bottom: '2rem',
              right: '2rem',
              width: 'clamp(150px, 25vw, 220px)',
              textAlign: 'right'
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : 20,
              transition: { 
                type: 'spring',
                stiffness: 500,
                damping: 25
              }
            }}
            exit={{ opacity: 0, x: 20 }}
            onClick={() => setShowSignature(false)}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <img 
              src="/Sign.png" 
              alt="Signature" 
              className="w-full h-auto ml-auto"
              style={{
                filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.15))',
                maxWidth: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
            <div className="absolute -bottom-2 right-0 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to dismiss
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Additional decorative elements */}
      {floatingElements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute rounded-full bg-gradient-to-r from-teal-100 to-cyan-100"
          style={{
            width: `${el.size}px`,
            height: `${el.size}px`,
            left: `${el.x}%`,
            top: `${el.y}%`,
            opacity: el.opacity,
            filter: 'blur(24px)',
          }}
          animate={{
            y: [0, 20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={100}
            gravity={0.15}
            colors={['#0d9488', '#0e7490', '#7c3aed', '#db2777']}
            className="z-0"
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen w-full flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-8"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center justify-center mx-auto shadow-lg">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-10 w-10 md:h-12 md:w-12 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                  />
                </svg>
              </div>
            </motion.div>

            <div className="mb-8 text-center">
              <motion.span 
                className="block text-5xl md:text-7xl font-bold text-slate-800 mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Happy
              </motion.span>
              <motion.span 
                className="block text-6xl md:text-8xl font-bold bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent italic"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  textShadow: '0 0 15px rgba(56, 178, 172, 0.3)'
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.4,
                  type: 'spring',
                  stiffness: 100
                }}
              >
                21st Birthday!
              </motion.span>
              <motion.div 
                className="h-1 bg-gradient-to-r from-teal-400 to-indigo-400 mt-4 rounded-full mx-auto"
                initial={{ width: 0 }}
                animate={{ width: '200px' }}
                transition={{ delay: 0.8, duration: 1 }}
              />
            </div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative"
            >
              <motion.p 
                className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed relative z-10"
              >
                Wishing you a year filled with joy, success, and beautiful moments. May this special day be as wonderful as you are!
              </motion.p>
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-r from-teal-50 to-indigo-50 rounded-2xl -z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-teal-100 to-indigo-100 rounded-2xl -z-20 blur-md opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center mt-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  downloadFile('/stickers.zip', 'birthday-stickers.zip');
                }}
                className="group relative px-8 py-4 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow hover:scale-105 hover:-translate-y-1"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-teal-500 group-hover:scale-110 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
                Download Stickers
              </button>
              
              <button 
                onClick={() => downloadFile('/music.mp3', 'birthday-song.mp3')}
                className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-xl font-medium hover:opacity-95 transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg hover:scale-105 hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Music
              </button>
            </motion.div>

            {/* Removed 'Tap anywhere' text as requested */}
          </motion.div>
        </div>
      </div>

      {/* Music control */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={toggleMusic}
          className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-slate-100"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-teal-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-teal-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          )}
        </button>
      </motion.div>
    </div>
  );
};

export default AtLastPage;
