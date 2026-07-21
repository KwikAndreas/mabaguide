import React from 'react';

// Custom Duotone & Gradient SVGs to replace generic line icons

export const CompassPremium = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="40" fill="url(#compass_grad)" fillOpacity="0.2"/>
    <circle cx="50" cy="50" r="30" fill="white" className="dark:fill-slate-800" style={{ filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.1))' }}/>
    <path d="M48 25L52 25L60 40L75 48L75 52L60 60L52 75H48L40 60L25 52V48L40 40L48 25Z" fill="url(#compass_grad)"/>
    <circle cx="50" cy="50" r="5" fill="#fff" />
    <defs>
      <linearGradient id="compass_grad" x1="25" y1="25" x2="75" y2="75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6"/>
        <stop offset="1" stopColor="#8B5CF6"/>
      </linearGradient>
    </defs>
  </svg>
);

export const PortalPremium = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="20" y="15" width="60" height="70" rx="12" fill="url(#portal_grad)" fillOpacity="0.2"/>
    <rect x="30" y="30" width="40" height="40" rx="8" fill="white" className="dark:fill-slate-800" />
    <path d="M38 45H62" stroke="url(#portal_grad)" strokeWidth="4" strokeLinecap="round"/>
    <path d="M38 55H50" stroke="url(#portal_grad)" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="70" cy="25" r="8" fill="#F97316"/>
    <defs>
      <linearGradient id="portal_grad" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F97316"/>
        <stop offset="1" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

export const DictionaryPremium = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 25C20 20 24 15 30 15H50V85H30C24 85 20 80 20 75V25Z" fill="url(#dict_grad1)"/>
    <path d="M80 25C80 20 76 15 70 15H50V85H70C76 85 80 80 80 75V25Z" fill="url(#dict_grad2)" fillOpacity="0.8"/>
    <rect x="60" y="30" width="10" height="4" rx="2" fill="white"/>
    <rect x="60" y="40" width="10" height="4" rx="2" fill="white"/>
    <defs>
      <linearGradient id="dict_grad1" x1="20" y1="15" x2="50" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981"/>
        <stop offset="1" stopColor="#059669"/>
      </linearGradient>
      <linearGradient id="dict_grad2" x1="50" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399"/>
        <stop offset="1" stopColor="#10B981"/>
      </linearGradient>
    </defs>
  </svg>
);
