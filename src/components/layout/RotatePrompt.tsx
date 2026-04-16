"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function RotatePrompt() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const dismissed = sessionStorage.getItem("rotate-prompt-dismissed");
    if (dismissed) {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("rotate-prompt-dismissed", "true");
  };

  if (!isClient || !isVisible) return null;

  return (
    <div className="rotate-prompt">
      <span>Tips: Please rotate your device to landscape for a better gaming experience.</span>
      <button 
        onClick={handleDismiss}
        style={{
          background: 'none',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          padding: '4px',
          marginLeft: '12px',
          display: 'flex',
          alignItems: 'center',
          opacity: 0.7
        }}
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </div>
  );
}
