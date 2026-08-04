import React from 'react';

export const CompassPremium = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" fill="var(--cat-academic, #2563EB)" stroke="currentColor" strokeWidth="4"/>
    <circle cx="50" cy="50" r="30" fill="var(--background, white)" stroke="currentColor" strokeWidth="4"/>
    <path d="M48 25L52 25L60 40L75 48L75 52L60 60L52 75H48L40 60L25 52V48L40 40L48 25Z" fill="currentColor"/>
    <circle cx="50" cy="50" r="5" fill="var(--background, white)" />
  </svg>
);

export const PortalPremium = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="20" y="15" width="60" height="70" rx="0" fill="var(--cat-bureaucracy, #EA580C)" stroke="currentColor" strokeWidth="4"/>
    <rect x="30" y="30" width="40" height="40" rx="0" fill="var(--background, white)" stroke="currentColor" strokeWidth="4" />
    <path d="M38 45H62" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
    <path d="M38 55H50" stroke="currentColor" strokeWidth="4" strokeLinecap="square"/>
    <rect x="70" y="10" width="16" height="16" fill="var(--cat-dictionary, #D97706)" stroke="currentColor" strokeWidth="4" />
  </svg>
);

export const DictionaryPremium = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 25C20 20 24 15 30 15H50V85H30C24 85 20 80 20 75V25Z" fill="var(--cat-organization, #059669)" stroke="currentColor" strokeWidth="4" strokeLinejoin="miter"/>
    <path d="M80 25C80 20 76 15 70 15H50V85H70C76 85 80 80 80 75V25Z" fill="var(--cat-dictionary, #D97706)" stroke="currentColor" strokeWidth="4" strokeLinejoin="miter"/>
    <rect x="58" y="30" width="12" height="4" fill="currentColor"/>
    <rect x="58" y="40" width="12" height="4" fill="currentColor"/>
  </svg>
);