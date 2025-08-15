'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Dancing_Script } from 'next/font/google';

// Load the signature font from Google Fonts
const signatureFont = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-signature',
});

export default function IntroPage() {
  const router = useRouter();

  const handleContinue = () => {
    // Set flag in localStorage to indicate user has seen the intro
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasSeenIntro', 'true');
    }
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-amber-50 to-amber-100">
      <motion.div 
        className="relative w-full max-w-2xl p-8 bg-yellow-50 shadow-2xl rounded-lg border-l-8 border-yellow-300"
        initial={{ opacity: 0, y: 20, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
        style={{ transformOrigin: 'top center' }}
      >
        {/* Sticky note pin */}
        <motion.div 
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center shadow-md z-10"
          initial={{ y: -20, scale: 0 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 500, damping: 15 }}
        >
          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
        </motion.div>
        
        <div className="relative">
          <motion.div 
            className="font-handwriting text-xl leading-relaxed text-gray-800 space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, staggerChildren: 0.1 }}
          >
            <motion.p initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              Hey V! 👋
            </motion.p>
            
            <motion.p initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              It&apos;s me! Yeah, you&apos;re right - back from the dead, again. I know we haven&apos;t really talked much for a while and you feel like there might be something going on or considering that I&apos;m busy. To answer the question, it is a maybe because it&apos;s something that can&apos;t be quite put into words. Hope that you are doing alright and things are going great with your life and you are as amazing as you are.
            </motion.p>
            
            <motion.p initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              To cut things short, I started wondering: my best friend is turning 21, what should I gift the new young adult? But after months of searching, I wasn&apos;t able to find something that would suit you. Hence, the burnout me decided on this tiny tiny idea of developing something for this idiot. Something that made it through months of planning and days of coding. Here it is finally - a birthday website for ya! It is just a review of your journey with me. It would be stored in history and you can look it up whenever you want.
            </motion.p>
            
            <motion.p initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              Hope You Like It! See you on the other side. ✨
            </motion.p>
            
            <motion.div 
              className={`${signatureFont.variable} font-signature text-4xl text-gray-800 mt-8 text-right`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Magizhan C
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={handleContinue}
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-800 font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Continue to the Website</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');
        
        .font-handwriting {
          font-family: 'Caveat', cursive, sans-serif;
          font-size: 1.4rem;
          line-height: 1.8;
        }
        
        .font-signature {
          font-family: var(--font-signature), 'Dancing Script', cursive, sans-serif;
          font-weight: 700;
        }
        
        @media (max-width: 640px) {
          .font-handwriting {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
}
