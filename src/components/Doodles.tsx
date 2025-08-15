import React from 'react';

export const doodleImages = [
  // Star doodle
  <svg key="star" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 5L35 20H50L38 30L43 45L30 35L17 45L22 30L10 20H25L30 5Z" 
          stroke="#6366f1" strokeWidth="2" fill="rgba(99, 102, 241, 0.1)"/>
  </svg>,
  
  // Heart doodle
  <svg key="heart" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 50C30 50 10 35 10 20C10 10 20 10 30 20C40 10 50 10 50 20C50 35 30 50 30 50Z" 
          stroke="#ec4899" strokeWidth="2" fill="rgba(236, 72, 153, 0.1)"/>
  </svg>,
  
  // Circle with dots
  <svg key="circle-dots" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="20" stroke="#10b981" strokeWidth="2" fill="rgba(16, 185, 129, 0.1)"/>
    <circle cx="25" cy="25" r="2" fill="#10b981"/>
    <circle cx="35" cy="25" r="2" fill="#10b981"/>
    <circle cx="30" cy="35" r="2" fill="#10b981"/>
  </svg>,
  
  // Triangle
  <svg key="triangle" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 10L50 45H10L30 10Z" stroke="#f59e0b" strokeWidth="2" fill="rgba(245, 158, 11, 0.1)"/>
  </svg>,
  
  // Flower
  <svg key="flower" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="20" r="8" stroke="#ef4444" strokeWidth="2" fill="rgba(239, 68, 68, 0.1)"/>
    <circle cx="40" cy="30" r="8" stroke="#ef4444" strokeWidth="2" fill="rgba(239, 68, 68, 0.1)"/>
    <circle cx="30" cy="40" r="8" stroke="#ef4444" strokeWidth="2" fill="rgba(239, 68, 68, 0.1)"/>
    <circle cx="20" cy="30" r="8" stroke="#ef4444" strokeWidth="2" fill="rgba(239, 68, 68, 0.1)"/>
    <circle cx="30" cy="30" r="5" fill="#ef4444"/>
  </svg>,
  
  // Lightning bolt
  <svg key="lightning" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 10L35 25H30L35 50L25 35H30L25 10Z" stroke="#8b5cf6" strokeWidth="2" fill="rgba(139, 92, 246, 0.1)"/>
  </svg>,
  
  // Cloud
  <svg key="cloud" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 35C15 35 10 30 10 25C10 20 15 15 20 15C22 10 27 10 30 15C35 10 40 15 40 20C45 20 50 25 50 30C50 35 45 40 40 40H20C17 40 15 38 15 35" 
          stroke="#06b6d4" strokeWidth="2" fill="rgba(6, 182, 212, 0.1)"/>
  </svg>,
  
  // Diamond
  <svg key="diamond" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 10L45 30L30 50L15 30L30 10Z" stroke="#84cc16" strokeWidth="2" fill="rgba(132, 204, 22, 0.1)"/>
  </svg>,
  
  // Spiral
  <svg key="spiral" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 30C30 25 35 20 40 25C45 30 40 35 35 35C30 35 25 30 25 25C25 20 30 15 35 15C40 15 45 20 45 25C45 30 40 35 35 35" 
          stroke="#f97316" strokeWidth="2" fill="none"/>
  </svg>,
  
  // Arrow
  <svg key="arrow" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 30L40 30M40 30L30 20M40 30L30 40" stroke="#6366f1" strokeWidth="2" fill="none"/>
    <circle cx="45" cy="30" r="3" fill="#6366f1"/>
  </svg>,
  
  // Sun
  <svg key="sun" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="12" stroke="#fbbf24" strokeWidth="2" fill="rgba(251, 191, 36, 0.1)"/>
    <path d="M30 5V15M30 45V55M55 30H45M15 30H5M47 13L41 19M19 41L13 47M47 47L41 41M19 19L13 13" 
          stroke="#fbbf24" strokeWidth="2"/>
  </svg>,
  
  // Moon
  <svg key="moon" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 10C35 15 40 25 35 35C30 45 20 40 15 30C10 20 15 10 25 10Z" 
          stroke="#a855f7" strokeWidth="2" fill="rgba(168, 85, 247, 0.1)"/>
  </svg>
];

export default doodleImages;
