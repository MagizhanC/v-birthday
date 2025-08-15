'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import AnalysisDashboard from '@/components/AnalysisDashboard';

// Disable SSR for this component to prevent hydration issues
const NoSSR = dynamic(() => Promise.resolve(({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)), { ssr: false });

const journeySteps = [
  {
    title: "Unlikely Ice Breakers",
    subtitle: "1st Year",
    content: {
      paragraph1: "The first year was, for you, a quiet kind of chaos — the kind where fitting in felt like trying to squeeze into a crowd already performing its own strange play. You were different, and in the best way possible. Every little thing you did stood out, not like a sore thumb, but like a rare flower in a garden of plastic plants. I noticed it early on, though I didn’t rush in — figured I’d get to know you at the right time. That time came on some random day, over some random subject help, and I still remember the moment. You’d been roaming around with other friends, battling the occasional project-guide drama (Bobby will forever remain in our history books), struggling with subjects here and there, yet somehow managing those impossible last-minute turnarounds before exams. Even back then, I couldn’t figure out how you’d pull yourself together overnight and come out the next morning ready to take on the world.",
      paragraph2: "By the second semester, a change of seating meant a change in pace — we started talking more. That’s when I knew this was going to be something special. Our first outing to Bird on Tree (minus Naveen) was the ice breaker I didn’t know I needed. I saw the unfiltered you — someone who somehow matched my vibe completely. Then came the calls. Long calls. The kind of calls I never usually make, but you made them feel like the most natural thing in the world. To this day, they’re the same: long, unplanned, never running out of topics. It was a year of starting something we didn’t even realise we were building. We talked about hackathons, teamwork, and dreams that didn’t always happen, but the seed of us was planted, and it was growing."
    }
  },
  {
    title: "Chaos in Sync",
    subtitle: "2nd Year",
    content: {
      paragraph1: "If the first year was an introduction, the second year was the plot twist. This was the year the four of us — you, me, Naveen, and Knikhil — became a thing. It started with me becoming class rep and one spontaneous call that spiraled into a plan. That plan, as you remember, failed twice before finally happening — a day before your birthday. We got you a pair of shoes that didn’t fit, but you wore them anyway, and that’s when I knew you were the type of person who could turn a mistake into a memory. By the end of the third semester, we were studying together in libraries (if you could call it that) and laying the foundations for our legendary late-night exam prep calls. We’d stay up until 2 a.m., taking turns explaining concepts to each other, trying to keep our brains from melting.",
      paragraph2: "And then came the fourth semester — a mixed bag of fun, disconnection, and growing pains. I moved, life started shifting, and at some point, I felt us drift — especially from you, the one I valued the most. But even in the rough patches, there were gems: Hidden Fork Bistro runs, ice creams despite your “I’m cutting sugar” phase, discovering we both had sinus issues, and even catching glimpses of the real you during the tougher days. This was the year I realised I wanted to be part of everything in your life — but I also realised I couldn’t always be. Still, it was the real beginning of something that would carry us further than either of us imagined."
    }
  },
  {
    title: "Laughs and Late Nights",
    subtitle: "3rd Year",
    content: {
      paragraph1: "This year was where our bond really cemented. It felt less like two friends figuring each other out and more like two people who’d been in sync for years. With the added pressure of projects, deadlines, and life creeping in, we somehow still managed to pull things together — usually at the last possible minute. We talked about more personal things, dug deeper into who we were, and made space for each other’s thoughts. I won’t lie — this was also the year I was secretly jealous. I wanted more one-on-one time with you, but it rarely happened, and I convinced myself I was overthinking. Still, there were wins: gaming sessions, BYTS classes (peak college vibes), meeting your family, and the infamous attendance scares.",
      paragraph2: "I watched you panic over life’s big questions, yet still push through, and I admired it. Every exam season, I made it my mission to prepare notes — not for me, but for you — just to make sure you’d have something solid to lean on. You might not have realised it, but those pages were my way of saying, “I’ve got you.” And despite the chaos, this year was full of laughs, late-night calls, and quiet understanding. Even when we drifted slightly, it always felt like we’d just pick up where we left off."
    }
  },
  {
    title: "Golden Hour Moments",
    subtitle: "4th Year",
    content: {
      paragraph1: "If we had to crown one year as the highlight reel, this would be it. We packed in the most fun, the most time together, and the most conversations that actually mattered. It all went by in what felt like seconds, and before I knew it, you were boarding your flight home. I didn’t show much outside, but it stung. I’d hoped we might end up in the same place again for higher studies, but maybe that’s not how this story was supposed to go. The Munnar trip remains unbeatable — not just for the scenery, but because I saw the real you there: the one who looked out for me in a crowd, noticed when I was off, and refused to let me drift away. That mattered more than you probably realise.",
      paragraph2: "Of course, it wasn’t all sunshine. There were the late-evening project demands, the ECM arrear fears, and the attendance paranoia. But between all that, I saw you chasing passions, juggling confusion, and still showing up when it counted. The alone time we did get was rare, but worth every second. That final phone call, when I broke down and realised you’d felt it too, was proof that this wasn’t just friendship — it was something deeper. Our last walk around the race course felt strangely quiet, like the universe knew it was closing a chapter. And even now, I think about how lucky I am that our paths crossed exactly when they did."
    }
  }
];

export default function JourneyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [direction, setDirection] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const [imageError, setImageError] = useState<number | null>(null);
  const router = useRouter();

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextStep = async () => {
    if (currentStep < journeySteps.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else if (currentStep === journeySteps.length - 1) {
      try {
        // Ensure we're on the client side before navigation
        if (typeof window !== 'undefined') {
          // Add a small delay to ensure state updates complete
          await new Promise(resolve => setTimeout(resolve, 100));
          // Navigate to analysis page
          window.location.href = '/analysis';
        }
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = journeySteps[currentStep];
  const parallaxOffset = scrollY * 0.3; // Adjust this value to control parallax intensity

  // Function to get image source
  const getImageSource = (step: number) => {
    // All images are in JPG format in the public/header directory
    return `/header/${step + 1}.jpg`;
  };

  const currentImageSources = getImageSource(currentStep);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-pulse text-teal-600">Loading...</div>
      </div>
    );
  }

  // Add the same dotted background as home page
  const backgroundStyle = {
    backgroundImage: 'radial-gradient(#94a3b8_1px, transparent_1px)',
    backgroundSize: '16px 16px',
    maskImage: 'radial-gradient(ellipse_50%_50%_at_50%_50%, #000_60%, transparent_100%)',
  };

  return (
    <NoSSR>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Dotted Background */}
        <div 
          className="fixed inset-0 z-0 pointer-events-none"
          style={backgroundStyle}
        ></div>
      {/* Progress Bar */}
      <motion.div 
        className="w-full px-4 py-8 md:px-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            {journeySteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                {/* Progress Circle */}
                <motion.div
                  className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center text-xs md:text-sm font-bold ${
                    index <= currentStep
                      ? 'bg-teal-500 border-teal-500 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                  animate={{
                    scale: index === currentStep ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {index + 1}
                </motion.div>
                
                {/* Step Label */}
                <div className="text-center mt-2">
                  <div className={`text-xs md:text-sm font-medium ${
                    index <= currentStep ? 'text-teal-600' : 'text-gray-400'
                  }`}>
                    {step.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Progress Line */}
          <div className="relative h-1 bg-gray-200 rounded-full mx-8 md:mx-12">
            <motion.div
              className="absolute h-full bg-teal-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / (journeySteps.length - 1)) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Content Area */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-4xl mx-auto w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-center"
            >
              {/* Header Image with Parallax and Format Fallback */}
              <div className="relative h-48 md:h-64 lg:h-80 w-full mb-8 overflow-hidden rounded-xl shadow-xl z-10">
                <motion.div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${currentImageSources})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: `translateY(${parallaxOffset * 0.3}px)`,
                    willChange: 'transform'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  onError={() => {
                    setImageError(currentStep);
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                    <div className="w-full">
                      <motion.h1 
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 leading-tight"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        {currentStepData.title}
                      </motion.h1>
                      <motion.p 
                        className="text-xl md:text-2xl text-teal-200 font-medium mt-1"
                        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        {currentStepData.subtitle}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
                {imageError === currentStep && (
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                    <div className="text-white text-center p-6">
                      <div className="text-4xl mb-2">🎨</div>
                      <p className="text-lg">No image found for this memory</p>
                      <p className="text-sm opacity-80">Add an image to /public/header/{currentStep + 1}.{`{webp,png,jpg}`}</p>
                    </div>
                  </div>
                )}
              </div>



              {/* Content Paragraphs */}
              <div className="max-w-3xl mx-auto space-y-6 mb-12">
                <motion.p 
                  className="text-base md:text-lg text-slate-700 leading-relaxed text-left"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {currentStepData.content.paragraph1}
                </motion.p>

                <motion.p 
                  className="text-base md:text-lg text-slate-700 leading-relaxed text-left"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {currentStepData.content.paragraph2}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons - Added relative positioning and z-index */}
      <motion.div 
        className="flex justify-between items-center px-4 py-4 md:px-8 relative z-10 bg-white/80 backdrop-blur-sm"
        style={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.05)' 
        }}
      >
        {/* Previous Button - Mobile (Circle) */}
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`md:hidden flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
            currentStep === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white text-teal-600 border border-teal-200 hover:bg-teal-50 hover:scale-105'
          }`}
          aria-label="Previous step"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        {/* Previous Button - Desktop */}
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`hidden md:flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            currentStep === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white text-teal-600 border border-teal-200 hover:bg-teal-50 hover:scale-105'
          }`}
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Previous
        </button>

        {/* Step Indicators */}
        <div className="flex items-center gap-2">
          {journeySteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStep ? 'bg-teal-500 w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Next/Continue Button - Mobile (Circle) - Only show if not on last step */}
        {currentStep < journeySteps.length - 1 && (
          <button
            onClick={nextStep}
            className="md:hidden flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
                     bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:scale-105 shadow-lg hover:shadow-xl"
            aria-label="Next step"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        )}

        {/* Continue Button - Desktop */}
        {currentStep < journeySteps.length - 1 ? (
          <button
            onClick={nextStep}
            className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300
                     bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Continue
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/sparkle.svg"
                alt=""
                width={16}
                height={16}
                className="brightness-0 invert"
              />
            </motion.div>
          </button>
        ) : (
          <button
            onClick={nextStep}
            className="flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-300
                     bg-gradient-to-r from-teal-500 to-indigo-500 text-white hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Let&apos;s Go!
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/sparkle.svg"
                alt=""
                width={16}
                height={16}
                className="brightness-0 invert"
              />
            </motion.div>
          </button>
        )}
        </motion.div>
      </div>
    </NoSSR>
  );
}
