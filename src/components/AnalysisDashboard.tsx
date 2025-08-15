'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Zap, Heart, TrendingUp, Award, ChevronRight, Key } from 'lucide-react';

type AnalysisItem = {
  id: number;
  text: string;
  isPositive: boolean;
};

const amazingFacts: AnalysisItem[] = [
  { id: 1, text: "Your incredible sense of humor that lights up every room and makes you the center of attention  ", isPositive: true },
  { id: 2, text: "The way you always know how to make people feel special and alright within one single moment and be there for them", isPositive: true },
  { id: 3, text: "Your determination to achieve your goals and the way you work towards it no matter how hard it is", isPositive: true },
  { id: 4, text: "Your creative and unique perspective on life, the true and unfiltered view of yours ", isPositive: true },
  { id: 5, text: "The charm you bring into the group of constant  arguments and the way you always find a way to make it better", isPositive: true },
];

const improvementAreas: AnalysisItem[] = [
  { id: 1, text: "Being too fixed on something so hard that it feels like too much", isPositive: false },
  { id: 2, text: "Going all in on something one day, and forgetting it the next day", isPositive: false },
  { id: 3, text: "Not being constant with emotions, one day it is all wonders and the next day it is pure hell", isPositive: false },
  { id: 4, text: "Poor memory & forgetfulness. Cooking things up to compensate with the things forgeted", isPositive: false },
  { id: 5, text: "Trying to do everything at once and with perfectionaism without any practicality", isPositive: false },
  { id: 6, text: "Never giving up on something, eventhough it is not relavant to the actual thing that matters", isPositive: false },
];

const AnalysisDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'strengths' | 'improvements'>('strengths');
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);

  useEffect(() => {
    // Animate items in sequence
    const timeoutIds = amazingFacts.map((_, index) => 
      setTimeout(() => {
        setAnimatedItems(prev => [...prev, index]);
      }, index * 100)
    );

    return () => timeoutIds.forEach(id => clearTimeout(id));
  }, []);

  const handleContinue = () => {
    router.push('/atlast');
  };

  const Header = () => (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8 sm:mb-12 px-2"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-500 mb-3 sm:mb-4 leading-tight">
        The Official &quot;You&quot; Analysis
      </h1>
      <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
        After extensive research (and by research, I mean years of friendship), here&apos;s what I&apos;ve discovered...
      </p>
    </motion.div>
  );

  const Tabs = () => (
    <div className="flex justify-center mb-6 sm:mb-8 px-2">
      <div className="inline-flex flex-wrap justify-center gap-1 sm:gap-0 bg-white/50 backdrop-blur-sm rounded-full p-1 shadow-sm border border-gray-100 w-full sm:w-auto">
        <button
          onClick={() => setActiveTab('strengths')}
          className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center flex-1 sm:flex-none justify-center min-w-[120px] ${
            activeTab === 'strengths' 
              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Your Strengths
        </button>
        <button
          onClick={() => setActiveTab('improvements')}
          className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center flex-1 sm:flex-none justify-center min-w-[120px] ${
            activeTab === 'improvements'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Growth Areas
        </button>
      </div>
    </div>
  );

  const Strengths = () => (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Award className="w-6 h-6 mr-2 text-teal-500" />
          Your Certified Superpowers
        </h2>
        <span className="px-3 py-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full">
          {amazingFacts.length} Scientific Observations
        </span>
      </div>
      <div className="grid gap-3 sm:gap-4 grid-cols-1">
        {amazingFacts.map((fact, index) => (
          <motion.div
            key={fact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: animatedItems.includes(index) ? 1 : 0,
              y: animatedItems.includes(index) ? 0 : 20 
            }}
            transition={{ delay: index * 0.1 }}
            className="relative p-4 sm:p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-start">
              <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-teal-500/10 text-teal-600 mr-3 sm:mr-4 group-hover:bg-teal-500/20 transition-colors">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <p className="text-gray-700 group-hover:text-gray-900 transition-colors">{fact.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );

  const Improvements = () => (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-amber-500" />
          Areas for World Domination... I Mean, Growth
        </h2>
        <span className="px-3 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
          {improvementAreas.length} Not-Really-Flaws
        </span>
      </div>
      <div className="grid gap-3 sm:gap-4 grid-cols-1">
        {improvementAreas.map((area, index) => (
          <motion.div
            key={area.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: animatedItems.includes(index) ? 1 : 0,
              y: animatedItems.includes(index) ? 0 : 20 
            }}
            transition={{ delay: index * 0.1 }}
            className="relative p-4 sm:p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-start">
              <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-amber-500/10 text-amber-600 mr-3 sm:mr-4 group-hover:bg-amber-500/20 transition-colors">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <p className="text-gray-700 group-hover:text-gray-900 transition-colors">{area.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );

  const SecretButton = () => {
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Close modal when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          setShowPasswordPrompt(false);
          setError('');
          setPassword('');
        }
      };

      if (showPasswordPrompt) {
        document.addEventListener('mousedown', handleClickOutside);
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [showPasswordPrompt]);

    const handleSecretClick = () => {
      setShowPasswordPrompt(true);
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (password === '31072003') {
        router.push('/secrets');
      } else {
        setError('Incorrect password. Try again!');
        setPassword('');
        if (inputRef.current) inputRef.current.focus();
      }
    };

    return (
      <>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-center"
        >
          <button
            onClick={handleSecretClick}
            className="group inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:bg-gray-50 border border-gray-200 mx-auto mt-2 sm:mt-4"
          >
            <Key className="w-4 h-4" />
            <span>Unlock Secret Content</span>
          </button>
        </motion.div>

        {showPasswordPrompt && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div ref={modalRef} className="bg-white rounded-xl p-5 sm:p-6 w-full max-w-md mx-2 sm:mx-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Key className="w-8 h-8 text-blue-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h3>
                <p className="text-gray-600 mb-6">
                  Let&apos;s test your memory, shall we? Hope you get this right.
                </p>
                <p className="text-sm text-gray-500 mb-6 italic">
                  Hint: What is my DOB? (in DDMMYYYY format)
                </p>
                
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError('');
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-base sm:text-sm"
                      placeholder="Enter the secret code"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handlePasswordSubmit(e);
                        }
                      }}
                    />
                    {error && (
                      <p className="mt-2 text-sm text-red-500 flex items-center justify-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {error}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowPasswordPrompt(false)}
                      className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition border border-gray-200"
                    >
                      Maybe Later
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl transition shadow-md hover:shadow-lg"
                    >
                      Unlock Secrets
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const ContinueButton = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-12 text-center space-y-8"
    >
      <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">✨ Key Finding ✨</h3>
        <p className="text-gray-700 mb-4">
          Our research indicates you&apos;re approximately 110% more amazing than the average human.
          This has been scientifically proven (by me, just now).
        </p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mx-auto my-4"></div>
        <p className="text-sm text-gray-500 italic">
          Disclaimer: Results may vary depending on who&apos;s reading this.
        </p>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={handleContinue}
          className="group inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Finally! Let&apos;s Go!
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        
        <SecretButton />
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative max-w-6xl mx-auto">
      <Header />
      <Tabs />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100/50 max-w-5xl mx-auto"
        >
          {activeTab === 'strengths' ? <Strengths /> : <Improvements />}
          <ContinueButton />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnalysisDashboard;
