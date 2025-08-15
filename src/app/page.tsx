'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';

// Dynamically import client-side only components with no SSR
const DraggableDoodle = dynamic(
  () => import('@/components/DraggableDoodle'),
  { ssr: false }
);

const DoodleInfoBox = dynamic(
  () => import('@/components/DoodleInfoBox'),
  { ssr: false }
);

// Function to generate non-overlapping positions avoiding center text area
const generateNonOverlappingPositions = (count: number, minDistance: number = 150) => {
  // Return empty array if window is not defined (SSR)
  if (typeof window === 'undefined') return [];
  
  const positions: { x: number; y: number }[] = [];
  const maxAttempts = 200;
  const padding = 50; // Minimum distance from screen edges
  
  // Screen dimensions
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  
  // Define center text exclusion zone (responsive for mobile and desktop)
  const centerX = screenWidth / 2;
  const centerY = screenHeight / 2;
  const isMobile = screenWidth < 768;
  
  // Larger exclusion zone for center text
  const exclusionWidth = screenWidth * (isMobile ? 0.9 : 0.5);
  const exclusionHeight = screenHeight * (isMobile ? 0.5 : 0.35);
  
  // Create a grid to ensure even distribution
  const gridSize = Math.ceil(Math.sqrt(count * 1.5)); // Add extra cells for better distribution
  const cellWidth = (screenWidth - 2 * padding) / gridSize;
  const cellHeight = (screenHeight - 2 * padding) / gridSize;
  
  // Shuffle grid cells to ensure randomness
  const cells = Array.from({ length: gridSize * gridSize }, (_, i) => i).sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < count && i < cells.length; i++) {
    const cellIndex = cells[i];
    const row = Math.floor(cellIndex / gridSize);
    const col = cellIndex % gridSize;
    
    // Calculate base position within the grid cell
    const baseX = padding + col * cellWidth + Math.random() * cellWidth * 0.5;
    const baseY = padding + row * cellHeight + Math.random() * cellHeight * 0.5;
    
    let attempts = 0;
    let validPosition = false;
    let x: number = 0, y: number = 0;
    
    // Try to find a valid position within the cell
    while (!validPosition && attempts < maxAttempts) {
      // Add some randomness within the cell
      x = Math.max(padding, Math.min(
        screenWidth - 150 - padding,
        baseX + (Math.random() - 0.5) * cellWidth * 0.8
      ));
      
      y = Math.max(padding, Math.min(
        screenHeight - 150 - padding,
        baseY + (Math.random() - 0.5) * cellHeight * 0.8
      ));
      
      // Check if position is NOT in center text area
      const inCenterZone = (
        x + 75 > centerX - exclusionWidth / 2 && 
        x + 75 < centerX + exclusionWidth / 2 &&
        y + 75 > centerY - exclusionHeight / 2 && 
        y + 75 < centerY + exclusionHeight / 2
      );
      
      // Check if this position is far enough from existing positions
      const farFromOthers = positions.every(pos => {
        const distance = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
        return distance >= minDistance;
      });
      
      // Additional check to avoid clustering in corners
      const tooCloseToCorner = (
        (x < padding * 1.5 && y < padding * 1.5) || // Top-left
        (x > screenWidth - padding * 2.5 && y < padding * 1.5) || // Top-right
        (x < padding * 1.5 && y > screenHeight - padding * 2.5) || // Bottom-left
        (x > screenWidth - padding * 2.5 && y > screenHeight - padding * 2.5) // Bottom-right
      );
      
      validPosition = !inCenterZone && farFromOthers && !tooCloseToCorner;
      attempts++;
    }
    
    if (attempts < maxAttempts) {
      positions.push({ x, y });
    }
  }
  
  return positions;
};

// Function to get random doodle image numbers (1-17)
const getRandomDoodleNumbers = (count: number) => {
  const availableNumbers = Array.from({ length: 17 }, (_, i) => i + 1);
  const shuffled = availableNumbers.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user has seen the intro before
    const hasSeenIntro = localStorage?.getItem('hasSeenIntro');
    
    // If it's their first time, show the intro
    if (hasSeenIntro !== 'true') {
      router.push('/intro');
    }
  }, [router]);
  const [isMounted, setIsMounted] = useState(false);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [doodleNumbers, setDoodleNumbers] = useState<number[]>([]);
  const [selectedDoodle, setSelectedDoodle] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [infoBox, setInfoBox] = useState<{
    isOpen: boolean;
    doodleNumber: number;
    position: { x: number; y: number };
  }>({
    isOpen: false,
    doodleNumber: 1,
    position: { x: 0, y: 0 }
  });
  
  // Set mounted state and generate positions on client side only
  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        // Generate positions - 10 for mobile, 15 for desktop
        const count = mobile ? 10 : 15;
        setPositions(generateNonOverlappingPositions(count));
        setDoodleNumbers(getRandomDoodleNumbers(count));
      };
      
      // Initial setup
      handleResize();
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // Don't render doodles during SSR
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-pulse text-teal-600 text-lg">Loading...</div>
      </div>
    );
  }

  const handleDoodleClick = (position: { x: number; y: number }, doodleNumber: number) => {
    setHasInteracted(true);
    setSelectedDoodle(doodleNumber);
    setInfoBox({
      isOpen: true,
      doodleNumber,
      position: {
        x: position.x,
        y: position.y
      }
    });
  };

  const closeInfoBox = () => {
    setInfoBox(prev => ({
      ...prev,
      isOpen: false
    }));
    setSelectedDoodle(null);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Larger Dotted Background Pattern */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `radial-gradient(circle, #94a3b8 2px, transparent 2px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}
      />
      
      {/* Animated Floating Dots - Larger */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-slate-400/15 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.1, 0.6, 0.1],
              scale: [0, 1, 1, 1],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: 2 + Math.random() * 4,
            }}
          />
        ))}
      </div>

      {/* Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-700 mb-2"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              delay: 1.5,
              ease: "easeOut"
            }}
          >
            It&apos;s Your Day
          </motion.h1>
          
          <motion.h2 
            className="text-6xl md:text-8xl lg:text-9xl font-medium italic text-teal-500 relative"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              delay: 2.0,
              ease: "easeOut"
            }}
          >
            <span className="relative">
              Vaishnavi !
              {/* Animated underline effect */}
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ 
                  duration: 1.5, 
                  delay: 3.0,
                  ease: "easeOut"
                }}
              />
              
              {/* Sparkle effects */}
              <motion.div
                className="absolute -top-4 -right-4 w-3 h-3 bg-teal-400 rounded-full"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: 4.0,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
              
              <motion.div
                className="absolute -top-2 left-8 w-2 h-2 bg-cyan-400 rounded-full"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: 4.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
            </span>
          </motion.h2>
        </div>
      </div>

      {/* Animated Dots */}
      {positions.map((position, index) => {
        const doodleNumber = doodleNumbers[index];
        if (!doodleNumber) return null;
        
        return (
          <DraggableDoodle
            key={`doodle-${index}`}
            id={`doodle-${index}`}
            initialX={position.x}
            initialY={position.y}
            onClick={(pos) => handleDoodleClick(pos, doodleNumber)}
          >
            <Image
              src={`/Doodle/${doodleNumber}.png`}
              alt={`Doodle ${doodleNumber}`}
              width={150}
              height={150}
              className="object-contain"
              draggable={false}
            />
          </DraggableDoodle>
        );
      })}

      {/* Floating Info Box */}
      <DoodleInfoBox
        isOpen={infoBox.isOpen}
        onClose={closeInfoBox}
        doodleNumber={infoBox.doodleNumber}
        position={infoBox.position}
      />

      {/* Info Text - disappears after first interaction */}
      {!hasInteracted && (
        <motion.div 
          className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.8, 
            delay: 6.5,
            ease: "easeOut"
          }}
        >
          <div className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-500/10 backdrop-blur-md rounded-full border border-teal-300/30 text-slate-700 text-sm shadow-lg"
               style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <div className="w-4 h-4 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
              i
            </div>
            <span className="hidden sm:inline text-center">Touch images for rekindling memories!</span>
            <span className="sm:hidden text-center">Touch images to explore!</span>
          </div>
        </motion.div>
      )}

      {/* Start Journey Button */}
      <motion.div 
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 7.0,
          ease: "easeOut",
          type: "spring",
          stiffness: 100,
          damping: 10
        }}
      >
        <Link href="/journey" className="no-underline">
          <button 
            className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-opacity-50 whitespace-nowrap"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Journey ?
              <motion.span
                className="inline-block"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Image 
                  src="/sparkle.svg" 
                  alt="Sparkle" 
                  width={20} 
                  height={20} 
                  className="brightness-0 invert"
                />
              </motion.span>
            </span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </Link>
      </motion.div>

      {/* Corner Decorative Elements */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-slate-300/40" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-slate-300/40" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-slate-300/40" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-slate-300/40" />
    </div>
  );
}
