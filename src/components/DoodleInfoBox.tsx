'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DoodleInfoBoxProps {
  isOpen: boolean;
  onClose: () => void;
  doodleNumber: number;
  position: { x: number; y: number };
}

// Random content data for each doodle
const doodleContent = {
  1: { header: "The Last Outing", body: "This was the last time we 4 went out together. It was a perfect day, with the sun shining and the wind in our hair." },
  2: { header: "Munnar Trip, Alien Look", body: "Remeber, how i was roaming in the hill top when i was having stomach troubles + jeep travels and the look i had on my face. Your collers + Hat (Punk Look)" },
  3: { header: "French Door Cafe", body: "Eventhough the food was not that great and we paid 4k for the meal. we took good photos when we had IoT CA2 the next day though, LOL !" },
  4: { header: "One Last Dance", body: "This picture is going to go through several memories that we shared together to pull ourselfs through all the four years of the shitty college and department. An end to all that" },
  5: { header: "Hidden Fork, Comfort Food", body: "Every single time it's like, we'll go there ! we'll go here ! and at the end it is just one peri peri fries and a chicken popcorn at HF !" },
  6: { header: "Look there, we'll click a pic", body: "You look savage though, but if you are wondering where is this. It was at lensekart where i bought glasses and you bought the free glass in my BOGO offer ! Hope you still have that." },
  7: { header: "Two girafees in one frame ", body: "Mysoor Zoo, where we found a pair for knikhil and he proposed to it, but sad that i rejected due to height issues and could not tolorate his explaining !" },
  8: { header: "IV Trip, Roomates", body: "If you are wondering what picture is this, it was taken during our IV stay with your roomates at the night when boby diteched camp fire !" },
  9: { header: "Go-Karting go brrrr..", body: "Finally a dream come true, but it was short lived as you crashed the cart during the turn !" },
  10: { header: "One Final Walk at Race Course", body: "You got awarded for the paper presentation and we enjoyed it walking a round in race course, the everytime go to spot !" },
  11: { header: "Experimenting with my phone", body: "We never would have clicked these many photos if we didn't have my flip though. It was funny but we did capture great memories though !" },
  12: { header: "Munnar Trip + Alien Look = Bliss", body: "Eventhough the trip sucked being with you was another amazing story that just started as we ended the journey. But it was worth it !" },
  13: { header: "The looks of a exhausted day", body: "God know why and when you gave this pose but i captured and it and it is going to be on the website rent free !" },
  14: { header: "Necessary Pose for a picture", body: "The pose that you necasarliy give for almost every photo we take, two hands with peace symbol and the the widest smile possible " },
  15: { header: "That Boat Ride", body: "The bliss from the boat and the weather of the day was just perfect and it captured some great moments !" },
  16: { header: "You, Me, Chaos !", body: "Can't forget the sessiosn where we would argue over every single detail and yet we ended up working nothing out." },
  17: { header: "Birthday Cap", body: "Naveen gifted you this cap, and this version looks better than the original version though !" }
};

const DoodleInfoBox: React.FC<DoodleInfoBoxProps> = ({ 
  isOpen, 
  onClose, 
  doodleNumber, 
  position 
}) => {
  const content = doodleContent[doodleNumber as keyof typeof doodleContent] || 
    { header: "Mystery Doodle", body: "This doodle holds secrets waiting to be discovered." };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Invisible backdrop for outside click detection */}
          <div
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          
          {/* Info Box */}
          <motion.div
            className="fixed z-50 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-2xl shadow-2xl border border-teal-200/50 p-6 max-w-sm w-80 backdrop-blur-sm"
            style={{
              left: Math.min(position.x, window.innerWidth - 320),
              top: Math.min(position.y, window.innerHeight - 200),
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.8,
              y: 20
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8,
              y: 20
            }}
            transition={{ 
              type: "spring",
              damping: 20,
              stiffness: 300
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-6 h-6 rounded-full bg-teal-100/80 hover:bg-teal-200/80 flex items-center justify-center text-teal-600 hover:text-teal-800 transition-colors"
            >
              ×
            </button>
            
            {/* Content */}
            <div className="pr-8">
              <motion.h3 
                className="text-xl font-bold mb-3 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {content.header}
              </motion.h3>
              
              <motion.p 
                className="text-slate-600 leading-relaxed text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {content.body}
              </motion.p>
            </div>
            
            {/* Decorative Element */}
            <motion.div
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full opacity-30"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DoodleInfoBox;
