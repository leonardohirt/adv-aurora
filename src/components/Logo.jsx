import React from 'react';

export default function Logo({ className = '', onClick }) {
  return (
    <a href="#inicio" className={`brand-logo-container ${className}`} onClick={onClick}>
      {/* SVG Legal Emblem */}
      <div className="brand-logo-emblem">
        <svg
          width="32"
          height="32"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="brand-logo-svg"
        >
          {/* Subtle Crest Circle */}
          <circle cx="18" cy="18" r="16.5" stroke="#C5A059" strokeWidth="1" strokeOpacity="0.4" />
          
          {/* Central Pillar Line */}
          <line x1="18" y1="7" x2="18" y2="28" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Scale Crossbar */}
          <line x1="10" y1="12" x2="26" y2="12" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Left Pan Chains & Bowl */}
          <line x1="10" y1="12" x2="7" y2="19" stroke="#C5A059" strokeWidth="1" />
          <line x1="10" y1="12" x2="13" y2="19" stroke="#C5A059" strokeWidth="1" />
          <path d="M6 19 C6 22.5, 14 22.5, 14 19 Z" fill="none" stroke="#C5A059" strokeWidth="1.2" />
          
          {/* Right Pan Chains & Bowl */}
          <line x1="26" y1="12" x2="23" y2="19" stroke="#C5A059" strokeWidth="1" />
          <line x1="26" y1="12" x2="29" y2="19" stroke="#C5A059" strokeWidth="1" />
          <path d="M22 19 C22 22.5, 30 22.5, 30 19 Z" fill="none" stroke="#C5A059" strokeWidth="1.2" />
          
          {/* Base Stand */}
          <line x1="13" y1="28" x2="23" y2="28" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="brand-logo-typography">
        <span className="brand-title">AURORA</span>
        <span className="brand-subtitle">ASSOCIADOS</span>
      </div>
    </a>
  );
}
