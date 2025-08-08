'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: new (options: {
          pageLanguage: string;
          includedLanguages: string;
          layout: number;
          autoDisplay: boolean;
          multilanguagePage: boolean;
        }, elementId: string) => void;
      };
    };
    googleTranslateElementInit: () => void;
  }
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export default function GoogleTranslate() {
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasAutoDetected, setHasAutoDetected] = useState(false);
  const [showAutoNotification, setShowAutoNotification] = useState(false);

  // Auto-detect user's language and translate automatically
  const detectAndSetLanguage = () => {
    if (hasAutoDetected) return; // Only run once per session

    // Get browser language
    const browserLang = navigator.language || navigator.languages[0];
    const langCode = browserLang.split('-')[0]; // Extract language code (e.g., 'es' from 'es-ES')
    
    // Check if user's language is supported and not English
    const supportedLang = languages.find(lang => lang.code === langCode);
    
    if (supportedLang && langCode !== 'en') {
      console.log(`🌍 Auto-detected language: ${supportedLang.name} (${langCode})`);
      
      // Set the language and trigger translation
      setCurrentLang(supportedLang);
      setHasAutoDetected(true);
      
      // Store in localStorage to remember user preference
      localStorage.setItem('auto-detected-language', langCode);
      localStorage.setItem('language-auto-applied', 'true');
      
      // Show notification first
      setShowAutoNotification(true);
      
      // Apply translation automatically after showing notification
      setTimeout(() => {
        changeLanguage(supportedLang, true);
      }, 2000); // 2 seconds delay to let the page load
    }
  };

  useEffect(() => {
    // Check if Google Translate is already loaded
    const checkGoogleTranslate = () => {
      return !!(window.google?.translate?.TranslateElement);
    };

    // Initialize or check existing
    if (!checkGoogleTranslate()) {
      // Wait for script to load
      const interval = setInterval(() => {
        if (checkGoogleTranslate()) {
          clearInterval(interval);
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => clearInterval(interval), 10000);
    }

    // Get current language from cookie
    const cookies = document.cookie.split(';');
    const googtransCookie = cookies.find(cookie => cookie.trim().startsWith('googtrans='));
    if (googtransCookie) {
      const langCode = googtransCookie.split('/')[2];
      const foundLang = languages.find(lang => lang.code === langCode);
      if (foundLang) {
        setCurrentLang(foundLang);
        setHasAutoDetected(true); // Mark as already handled
      }
    } else {
      // Only auto-detect if no existing translation cookie and not already detected
      const alreadyApplied = localStorage.getItem('language-auto-applied');
      if (!alreadyApplied) {
        setTimeout(detectAndSetLanguage, 3000); // Detect after 3 seconds
      }
    }
  }, []);

  const changeLanguage = (language: Language, isAutomatic = false) => {
    setCurrentLang(language);
    setIsDropdownOpen(false);

    if (isAutomatic) {
      console.log(`🚀 Auto-translating to ${language.name}...`);
    }

    // Set the Google Translate cookie
    document.cookie = `googtrans=/en/${language.code}; path=/; domain=${window.location.hostname}`;
    
    // Try to trigger Google Translate
    if (window.google?.translate) {
      const translateElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (translateElement) {
        translateElement.value = language.code;
        translateElement.dispatchEvent(new Event('change'));
      }
    }
    
    // For automatic translation, reload smoothly
    if (isAutomatic) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      // For manual selection, reload immediately
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };


  return (
    <>
      {/* Auto-Translation Notification */}
      {showAutoNotification && (
        <div className="fixed top-24 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          <div className="flex items-center space-x-3">
            <span className="text-lg">{currentLang.flag}</span>
            <div>
              <div className="font-semibold text-sm">¡Detectamos tu idioma!</div>
              <div className="text-xs opacity-90">Traduciendo a {currentLang.name}...</div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Language Selector */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-black/20 hover:bg-black/30 transition-all duration-300 border border-white/10"
          aria-label="Select Language"
        >
          <span className="text-lg">{currentLang.flag}</span>
          <span className="text-white font-medium text-sm hidden sm:block">
            {currentLang.name}
          </span>
          <svg 
            className={`w-4 h-4 text-white transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language)}
                className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gradient-to-r hover:from-yellow-400/20 hover:to-orange-500/20 transition-all duration-200 ${
                  currentLang.code === language.code 
                    ? 'bg-gradient-to-r from-yellow-400/10 to-orange-500/10 text-orange-600' 
                    : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
                {currentLang.code === language.code && (
                  <svg className="w-4 h-4 ml-auto text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </>
  );
}