'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Disable SSR for this component to prevent hydration issues
const AnalysisDashboard = dynamic(
  () => import('@/components/AnalysisDashboard'),
  { ssr: false }
);

const backgroundStyle = {
  backgroundImage: 'radial-gradient(#94a3b8_1px, transparent_1px)',
  backgroundSize: '16px 16px',
  maskImage: 'radial-gradient(ellipse_50%_50%_at_50%_50%, #000_60%, transparent_100%)',
};

export default function AnalysisPage() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-pulse text-teal-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Dotted Background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={backgroundStyle}
      ></div>

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl">
          <AnalysisDashboard />
        </div>
      </div>
    </div>
  );
}
