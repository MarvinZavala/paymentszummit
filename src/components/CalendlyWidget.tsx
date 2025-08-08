'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

interface CalendlyWidgetProps {
  url?: string;
  minWidth?: number;
  height?: number;
  className?: string;
}

export default function CalendlyWidget({ 
  url = "https://calendly.com/save-zummitpayments/30min?month=2025-08", 
  minWidth = 320, 
  height = 700,
  className = ""
}: CalendlyWidgetProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Intersection Observer para lazy loading
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('.calendly-container');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Cargar script solo cuando sea visible
    const loadCalendlyScript = () => {
      if (document.querySelector('script[src*="calendly.com"]')) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      script.onerror = () => console.warn('Failed to load Calendly script');
      document.head.appendChild(script);
    };

    // Delay para evitar bloquear el render inicial
    const timer = setTimeout(loadCalendlyScript, 100);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <div className={`calendly-container ${className}`}>
      {isLoaded ? (
        <div 
          className="calendly-inline-widget" 
          data-url={url}
          style={{ minWidth: `${minWidth}px`, height: `${height}px` }}
        />
      ) : (
        <div 
          className="flex items-center justify-center bg-neutral-900/50 rounded-lg"
          style={{ minWidth: `${minWidth}px`, height: `${height}px` }}
        >
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-neutral-400">Loading calendar...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Embedded Calendly Widget Component
export function CalendlyEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`calendly-embed ${className}`}>
      <div className="glass rounded-3xl p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Schedule a Consultation</h3>
        <p className="text-neutral-400 mb-8 leading-relaxed">
          Book a free 30-minute consultation with one of our payment processing experts. 
          We&apos;ll analyze your current setup and show you how to save up to 100% on fees.
        </p>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center space-x-3">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span className="text-neutral-300">Free consultation & cost analysis</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span className="text-neutral-300">Custom pricing proposal</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span className="text-neutral-300">No commitment required</span>
          </div>
        </div>

        <button 
          onClick={() => {
            // You can replace this with actual Calendly popup functionality
            window.open('https://calendly.com/save-zummitpayments/30min?month=2025-08', '_blank');
          }}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 transition-all duration-300 hover:scale-105"
        >
          Schedule Free Consultation
        </button>
        
        <p className="text-neutral-500 text-sm mt-4">
          Available Monday - Sunday, 9 AM - 9 PM EST
        </p>
      </div>
    </div>
  );
}

// Calendly Popup Button Component
export function CalendlyButton({ 
  text = "Schedule Meeting",
  className = "",
  url = "https://calendly.com/save-zummitpayments/30min?month=2025-08"
}: {
  text?: string;
  className?: string;
  url?: string;
}) {
  const openCalendly = () => {
    // Always open in new window for reliability
    window.open(url, '_blank');
  };

  return (
    <button 
      onClick={openCalendly}
      className={`bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2 ${className}`}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
      </svg>
      <span>{text}</span>
    </button>
  );
}