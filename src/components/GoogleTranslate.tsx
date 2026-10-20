'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';

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
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

const notificationTexts: { [key: string]: { detected: string; translating: string } } = {
  es: { detected: '¡Detectamos tu idioma!', translating: 'Traduciendo a' },
  pt: { detected: 'Detectamos seu idioma!', translating: 'Traduzindo para' },
  fr: { detected: 'Nous avons détecté votre langue!', translating: 'Traduction vers' },
  it: { detected: 'Abbiamo rilevato la tua lingua!', translating: 'Traducendo in' },
  de: { detected: 'Wir haben Ihre Sprache erkannt!', translating: 'Übersetzen auf' },
  nl: { detected: 'We hebben je taal gedetecteerd!', translating: 'Vertalen naar' },
  zh: { detected: '我们检测到了您的语言！', translating: '正在翻译为' },
  ja: { detected: 'あなたの言語を検出しました！', translating: '翻訳中' },
  ru: { detected: 'Мы определили ваш язык!', translating: 'Перевод на' },
  en: { detected: 'We detected your language!', translating: 'Translating to' }
};

export default function GoogleTranslate() {
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasAutoDetected, setHasAutoDetected] = useState(false);
  const [showAutoNotification, setShowAutoNotification] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();
  // Where the menu opens. Measured from the button, so it works in the desktop header and the mobile menu.
  const [placement, setPlacement] = useState({ up: false, alignRight: true });

  // Auto-detect user's language and translate automatically
  const detectAndSetLanguage = () => {
    if (hasAutoDetected) return; // Only run once per session

    // Get browser language
    const browserLang = navigator.language || navigator.languages[0];
    const langCode = browserLang.split('-')[0]; // Extract language code (e.g., 'es' from 'es-ES')
    
    // Check if user's language is supported and not English
    const supportedLang = languages.find(lang => lang.code === langCode);
    
    // Only auto-translate if the user's language is NOT English and is supported
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
    } else {
      // For English users or unsupported languages, mark as already handled to prevent future detection
      setHasAutoDetected(true);
      localStorage.setItem('language-auto-applied', 'true');
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
      const browserLang = navigator.language || navigator.languages[0];
      const langCode = browserLang.split('-')[0];
      
      // Don't auto-detect for English users or if already processed
      if (!alreadyApplied && langCode !== 'en') {
        setTimeout(detectAndSetLanguage, 3000); // Detect after 3 seconds
      } else if (langCode === 'en') {
        // For English users, mark as already handled without showing notification
        localStorage.setItem('language-auto-applied', 'true');
        setHasAutoDetected(true);
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


  // Menu behaviour (visual layer only): click outside closes, keyboard follows the menu button pattern.
  useEffect(() => {
    if (!isDropdownOpen) return;

    const currentIndex = Math.max(
      0,
      languages.findIndex((language) => language.code === currentLang.code)
    );
    itemRefs.current[currentIndex]?.focus();

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsDropdownOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [isDropdownOpen, currentLang.code]);

  const openMenu = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const menuHeight = 470;
      const spaceBelow = window.innerHeight - rect.bottom;
      setPlacement({
        up: spaceBelow < menuHeight && rect.top > spaceBelow,
        alignRight: rect.left + rect.width / 2 > window.innerWidth / 2,
      });
    }
    setIsDropdownOpen(true);
  };

  const closeMenu = (returnFocus: boolean) => {
    setIsDropdownOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  };

  const handleButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      openMenu();
    } else if (event.key === 'Escape' && isDropdownOpen) {
      event.preventDefault();
      closeMenu(true);
    }
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const items = itemRefs.current.filter((item): item is HTMLButtonElement => item !== null);
    const index = items.indexOf(document.activeElement as HTMLButtonElement);
    const focusItem = (next: number) => items[(next + items.length) % items.length]?.focus();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusItem(index + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusItem(index - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusItem(0);
        break;
      case 'End':
        event.preventDefault();
        focusItem(items.length - 1);
        break;
      case 'Escape':
        event.preventDefault();
        closeMenu(true);
        break;
      case 'Tab':
        closeMenu(false);
        break;
    }
  };

  return (
    <>
      {/* Auto-Translation Notification */}
      {showAutoNotification && (
        <div
          role="status"
          translate="no"
          className="notranslate fixed right-4 top-24 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-xl bg-navy-900 px-5 py-3.5 text-white shadow-xl shadow-navy-950/30 ring-1 ring-white/15"
        >
          <GlobeIcon className="h-5 w-5 text-gold-400" />
          <div>
            <div className="text-sm font-semibold">
              {notificationTexts[currentLang.code]?.detected || notificationTexts.en.detected}
            </div>
            <div className="text-sm text-navy-200">
              {notificationTexts[currentLang.code]?.translating || notificationTexts.en.translating} {currentLang.name}...
            </div>
          </div>
        </div>
      )}

      {/* Custom Language Selector */}
      <div ref={containerRef} className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => (isDropdownOpen ? setIsDropdownOpen(false) : openMenu())}
          onKeyDown={handleButtonKeyDown}
          aria-haspopup="menu"
          aria-expanded={isDropdownOpen}
          aria-controls={isDropdownOpen ? menuId : undefined}
          className="flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/10 aria-expanded:border-white/25 aria-expanded:bg-white/10"
        >
          <GlobeIcon className="h-[1.1rem] w-[1.1rem] text-navy-200" />
          <span className="sr-only">Language: </span>
          <span translate="no" lang={currentLang.code} className="notranslate">
            {currentLang.name}
          </span>
          <svg
            className={`h-4 w-4 text-navy-200 transition-transform duration-150 ${isDropdownOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            id={menuId}
            role="menu"
            aria-label="Choose a language"
            onKeyDown={handleMenuKeyDown}
            className={`absolute z-50 w-56 rounded-xl border border-line bg-white py-1.5 text-navy-900 shadow-xl shadow-navy-950/20 ${
              placement.up ? 'bottom-full mb-2' : 'top-full mt-2'
            } ${placement.alignRight ? 'right-0' : 'left-0'}`}
          >
            {languages.map((language, index) => {
              const isCurrent = currentLang.code === language.code;
              return (
                <button
                  key={language.code}
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isCurrent}
                  tabIndex={-1}
                  lang={language.code}
                  translate="no"
                  onClick={() => changeLanguage(language)}
                  className={`notranslate flex w-full items-center gap-3 px-4 py-2.5 text-left text-[0.95rem] text-navy-900 transition-colors hover:bg-paper focus:bg-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-navy-700 ${
                    isCurrent ? 'font-semibold' : ''
                  }`}
                >
                  <span className="flex-1">{language.name}</span>
                  {isCurrent && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy-900 text-gold-400" aria-hidden="true">
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M3 12h18M12 3c2.5 2.6 3.75 5.6 3.75 9S14.5 18.4 12 21c-2.5-2.6-3.75-5.6-3.75-9S9.5 5.6 12 3z" />
    </svg>
  );
}
