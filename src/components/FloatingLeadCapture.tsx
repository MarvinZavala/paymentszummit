'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase, type Lead } from '@/lib/supabase';

interface FloatingLeadCaptureProps {
  pageName?: string;
}

export default function FloatingLeadCapture({}: FloatingLeadCaptureProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  
  // Use refs to track values across event handlers
  const interestScoreRef = useRef(0);
  const isTriggeredRef = useRef(false);
  const timeSpentRef = useRef(0);
  const scrollDepthRef = useRef(0);
  const mouseMovementsRef = useRef(0);
  
  const [formData, setFormData] = useState({
    businessName: '',
    firstName: '',
    phone: '',
    email: '',
    processingVolume: '$5k - $25k'
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Check if form was already submitted or dismissed
  useEffect(() => {
    const submitted = localStorage.getItem('zummit_lead_submitted');
    const dismissed = localStorage.getItem('zummit_lead_dismissed');
    const lastShown = localStorage.getItem('zummit_lead_last_shown');
    
    if (submitted === 'true') {
      setHasBeenShown(true);
      return;
    }
    
    // Don't show again for 24 hours if dismissed
    if (dismissed && lastShown) {
      const lastShownTime = parseInt(lastShown);
      const now = Date.now();
      const cooldownMs = 24 * 60 * 60 * 1000; // 24 hours
      
      if (now - lastShownTime < cooldownMs) {
        setHasBeenShown(true);
        return;
      } else {
        // Clear old dismissal if cooldown has passed
        localStorage.removeItem('zummit_lead_dismissed');
      }
    }
  }, []);

  // Show popup function
  const showPopup = useCallback(() => {
    if (hasBeenShown || isTriggeredRef.current || isVisible) {
      return;
    }
    
    isTriggeredRef.current = true;
    setIsVisible(true);
    localStorage.setItem('zummit_lead_last_shown', Date.now().toString());
  }, [hasBeenShown, isVisible]);

  // Add interest points
  const addInterest = useCallback((points: number) => {
    if (hasBeenShown || isTriggeredRef.current) return;
    
    interestScoreRef.current += points;
    
    // Threshold for activation
    if (interestScoreRef.current >= 40) {
      showPopup();
    }
  }, [hasBeenShown, showPopup]);

  useEffect(() => {
    if (hasBeenShown) {
      return;
    }

    // Time-based tracking - more aggressive
    const timeInterval = setInterval(() => {
      if (isTriggeredRef.current) {
        clearInterval(timeInterval);
        return;
      }
      
      timeSpentRef.current += 1;
      
      // More frequent time rewards
      if (timeSpentRef.current === 8) {
        addInterest(20);
      } else if (timeSpentRef.current === 15) {
        addInterest(25);
      } else if (timeSpentRef.current === 30) {
        addInterest(30);
      }
    }, 1000);

    // Scroll tracking
    const handleScroll = () => {
      if (isTriggeredRef.current) return;
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const scrollPercent = Math.min((scrollTop / (documentHeight - windowHeight)) * 100, 100);
      
      if (scrollPercent > scrollDepthRef.current) {
        const previousDepth = scrollDepthRef.current;
        scrollDepthRef.current = scrollPercent;
        
        // Reward scroll milestones
        if (previousDepth < 20 && scrollPercent >= 20) {
          addInterest(15);
        } else if (previousDepth < 40 && scrollPercent >= 40) {
          addInterest(20);
        } else if (previousDepth < 60 && scrollPercent >= 60) {
          addInterest(25);
        }
      }
    };

    // Mouse movement tracking
    const handleMouseMove = () => {
      if (isTriggeredRef.current) return;
      
      mouseMovementsRef.current += 1;
      
      if (mouseMovementsRef.current === 30) {
        addInterest(10);
      } else if (mouseMovementsRef.current === 60) {
        addInterest(15);
      }
    };

    // Click tracking
    const handleClick = (e: MouseEvent) => {
      if (isTriggeredRef.current) return;
      
      const target = e.target as HTMLElement;
      
      // High value elements
      if (target.closest('button') || target.closest('a[href*="contact"]') || target.closest('a[href*="quote"]') || target.closest('a[href*="get-quote"]')) {
        addInterest(35);
      }
      // Medium value elements
      else if (target.closest('a') || target.closest('[role="button"]')) {
        addInterest(15);
      }
      // Any click shows some engagement
      else {
        addInterest(5);
      }
    };

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (isTriggeredRef.current) return;
      
      // Only trigger on upward movement (exit intent)
      if (e.clientY <= 10 && e.relatedTarget === null) {
        showPopup();
      }
    };

    // Mobile touch events for better mobile support
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isTriggeredRef.current) return;
      
      const touchY = e.touches[0].clientY;
      const touchDiff = touchStartY - touchY;
      
      // Add points for touch scrolling
      if (Math.abs(touchDiff) > 50) {
        addInterest(3);
        touchStartY = touchY; // Reset for next measurement
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Cleanup function
    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [hasBeenShown, addInterest, showPopup]);

  // Form validation
  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'businessName':
        if (!value.trim()) return 'Business name is required';
        if (value.trim().length < 2) return 'Business name must be at least 2 characters';
        return '';
      case 'firstName':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'Name can only contain letters';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value.trim())) return 'Please enter a valid phone number';
        return '';
      case 'email':
        if (!value.trim()) return 'Email address is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
        return '';
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    newErrors.businessName = validateField('businessName', formData.businessName);
    newErrors.firstName = validateField('firstName', formData.firstName);
    newErrors.phone = validateField('phone', formData.phone);
    newErrors.email = validateField('email', formData.email);
    
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) delete newErrors[key];
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const leadData: Omit<Lead, 'id' | 'created_at'> = {
        business_location: 'Yes',
        processing_volume: formData.processingVolume,
        business_name: formData.businessName,
        first_name: formData.firstName,
        last_name: '',
        phone: formData.phone,
        email: formData.email
      };

      const { error } = await supabase
        .from('leads')
        .insert([leadData])
        .select();

      if (error) throw error;
      setIsSuccess(true);
      localStorage.setItem('zummit_lead_submitted', 'true');
      
      // Auto close after success message
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
      
    } catch (error) {
      console.error('Error submitting floating form:', error);
      alert('There was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('zummit_lead_dismissed', 'true');
    localStorage.setItem('zummit_lead_last_shown', Date.now().toString());
  };

  if (!isVisible || hasBeenShown) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn" />
      
      {/* Floating Form - Responsive positioning */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 rounded-2xl shadow-2xl border border-yellow-400/30 w-full max-w-lg mx-auto relative animate-slideUp overflow-hidden">
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 md:top-4 md:right-4 text-white/70 hover:text-white text-xl md:text-2xl font-light transition-all duration-200 hover:rotate-90 transform z-10 w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full touch-manipulation"
            aria-label="Close popup"
          >
            ×
          </button>

          <div className="relative p-4 md:p-6">
            {!isSuccess ? (
              <>
                {/* Header */}
                <div className="text-center mb-4 md:mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center mb-3 md:mb-4 shadow-2xl animate-bounce">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  
                  <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                    🚀 Don&apos;t Miss Out!
                  </h2>
                  <p className="text-yellow-100 text-sm mb-2">
                    <strong>Save up to 40%</strong> on payment processing fees
                  </p>
                  <div className="inline-flex items-center space-x-2 bg-red-500/20 border border-red-400/50 rounded-full px-3 py-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="text-red-200 text-xs font-semibold">LIMITED TIME OFFER</span>
                  </div>
                </div>

                {/* Form - Mobile optimized */}
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Business Name *"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      className={`w-full p-3 md:p-4 rounded-lg bg-white/95 text-black text-sm placeholder-gray-500 focus:outline-none focus:ring-2 border transition-all duration-200 touch-manipulation ${
                        errors.businessName 
                          ? 'border-red-500 focus:ring-red-400/50' 
                          : 'border-gray-200 focus:ring-yellow-400/50'
                      }`}
                      required
                    />
                    {errors.businessName && (
                      <p className="text-red-400 text-xs mt-1 font-medium">{errors.businessName}</p>
                    )}
                  </div>
                  
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full p-3 md:p-4 rounded-lg bg-white/95 text-black text-sm placeholder-gray-500 focus:outline-none focus:ring-2 border transition-all duration-200 touch-manipulation ${
                        errors.firstName 
                          ? 'border-red-500 focus:ring-red-400/50' 
                          : 'border-gray-200 focus:ring-yellow-400/50'
                      }`}
                      required
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-xs mt-1 font-medium">{errors.firstName}</p>
                    )}
                  </div>
                  
                  {/* Mobile-friendly two-column layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="Phone *"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full p-3 md:p-4 rounded-lg bg-white/95 text-black text-sm placeholder-gray-500 focus:outline-none focus:ring-2 border transition-all duration-200 touch-manipulation ${
                          errors.phone 
                            ? 'border-red-500 focus:ring-red-400/50' 
                            : 'border-gray-200 focus:ring-yellow-400/50'
                        }`}
                        required
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-1 font-medium">{errors.phone}</p>
                      )}
                    </div>
                    
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full p-3 md:p-4 rounded-lg bg-white/95 text-black text-sm placeholder-gray-500 focus:outline-none focus:ring-2 border transition-all duration-200 touch-manipulation ${
                          errors.email 
                            ? 'border-red-500 focus:ring-red-400/50' 
                            : 'border-gray-200 focus:ring-yellow-400/50'
                        }`}
                        required
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1 font-medium">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <select
                    value={formData.processingVolume}
                    onChange={(e) => handleInputChange('processingVolume', e.target.value)}
                    className="w-full p-3 md:p-4 rounded-lg bg-white/95 text-black text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50 border border-gray-200 transition-all duration-200 touch-manipulation"
                  >
                    <option value="< $5k">Less than $5k/month</option>
                    <option value="$5k - $25k">$5k - $25k/month</option>
                    <option value="$25k - $50k">$25k - $50k/month</option>
                    <option value="$50k - $100k">$50k - $100k/month</option>
                    <option value="$100k - $200k">$100k - $200k/month</option>
                    <option value="$200k+">$200k+/month</option>
                  </select>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 hover:from-yellow-500 hover:via-orange-600 hover:to-yellow-500 disabled:from-gray-400 disabled:to-gray-500 text-black font-bold py-3 md:py-4 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl touch-manipulation"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        <span>SUBMITTING...</span>
                      </div>
                    ) : (
                      '💰 CLAIM MY FREE SAVINGS ANALYSIS'
                    )}
                  </button>
                </form>

                {/* Trust indicators - Mobile optimized */}
                <div className="mt-3 md:mt-4 text-center">
                  <div className="flex items-center justify-center space-x-3 md:space-x-4 text-xs text-gray-300 mb-2">
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                      </svg>
                      <span className="hidden sm:inline">100% Secure</span>
                      <span className="sm:hidden">Secure</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                      </svg>
                      <span className="hidden sm:inline">No Spam</span>
                      <span className="sm:hidden">No Spam</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                      </svg>
                      <span className="hidden sm:inline">24h Response</span>
                      <span className="sm:hidden">Fast Reply</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">
                    🔥 <strong>2,500+</strong> businesses saved
                  </p>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-4 md:py-6">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-4 animate-bounce">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-white text-xl md:text-2xl font-bold mb-2">
                  🎉 Success!
                </h2>
                <p className="text-green-200 text-sm mb-4">
                  Your savings analysis is being prepared!
                </p>
                <div className="bg-yellow-400/20 border border-yellow-400/50 rounded-lg p-3">
                  <p className="text-yellow-200 text-sm">
                    <strong>📞 Expect our call within 2 hours</strong><br />
                    <span className="text-xs">We&apos;ll show you exactly how much you can save</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </>
  );
}