'use client';

import { useState } from 'react';
import { supabase, type Lead } from '@/lib/supabase';

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExitIntentPopup({ isOpen, onClose }: ExitIntentPopupProps) {
  const [formData, setFormData] = useState({
    businessName: '',
    firstName: '',
    email: '',
    processingVolume: '$5k - $25k'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.businessName.trim() || !formData.firstName.trim() || !formData.email.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const leadData: Omit<Lead, 'id' | 'created_at'> = {
        business_location: 'Yes', // Default assumption for exit-intent
        processing_volume: formData.processingVolume,
        business_name: formData.businessName,
        first_name: formData.firstName,
        last_name: '', // Optional in mini form
        phone: '', // Optional in mini form  
        email: formData.email
      };

      const { data, error } = await supabase
        .from('leads')
        .insert([leadData])
        .select();

      if (error) throw error;

      console.log('Exit-intent lead submitted:', data);
      setIsSuccess(true);
      
      // Auto close after 2 seconds
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting exit-intent form:', error);
      alert('There was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 w-full max-w-md mx-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl font-light transition-colors duration-200 hover:rotate-90 transform z-10"
        >
          ×
        </button>

        <div className="p-6">
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h2 className="text-white text-2xl font-bold mb-2">
                  Wait! Don&apos;t Miss Out
                </h2>
                <p className="text-blue-100 text-sm">
                  Get your free savings analysis before you go
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Business Name *"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/95 text-black text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 border border-gray-200"
                  required
                />
                
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/95 text-black text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 border border-gray-200"
                  required
                />
                
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/95 text-black text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 border border-gray-200"
                  required
                />
                
                <select
                  value={formData.processingVolume}
                  onChange={(e) => handleInputChange('processingVolume', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/95 text-black text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50 border border-gray-200"
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
                  disabled={isSubmitting || !formData.businessName.trim() || !formData.firstName.trim() || !formData.email.trim()}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-black font-bold py-3 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'SUBMITTING...' : 'GET MY FREE ANALYSIS'}
                </button>
              </form>

              <p className="text-xs text-gray-400 text-center mt-3">
                💰 See how much you can save in processing fees
              </p>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-white text-xl font-bold mb-2">
                Thank You!
              </h2>
              <p className="text-blue-100 text-sm">
                We&apos;ll contact you within 24 hours with your savings analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}