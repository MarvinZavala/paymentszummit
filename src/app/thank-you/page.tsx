'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function ThankYou() {
  useEffect(() => {
    // Optional: Track conversion event for analytics
    if (typeof window !== 'undefined') {
      // Add analytics tracking here if needed
      console.log('Thank you page visited - conversion tracked');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Content Container */}
      <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 w-full max-w-3xl mx-auto relative z-10">
        <div className="p-8 md:p-12 text-center">
          
          {/* Success Icon */}
          <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center shadow-2xl mb-8">
            <svg className="w-16 h-16 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          {/* Main Heading */}
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">
            Thank You!
          </h1>

          {/* Subheading */}
          <p className="text-blue-100 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto mb-8">
            Your information has been received successfully. We&apos;ll contact you soon with the best savings options for your business.
          </p>

          {/* What Happens Next */}
          <div className="space-y-6 text-blue-200 text-lg mb-12">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                <span className="text-yellow-400 font-bold">1</span>
              </div>
              <p className="text-left">📧 We&apos;ll send you a detailed proposal within 24 hours</p>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                <span className="text-yellow-400 font-bold">2</span>
              </div>
              <p className="text-left">📞 A payment specialist will call you to discuss your savings</p>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                <span className="text-yellow-400 font-bold">3</span>
              </div>
              <p className="text-left">💰 Start saving up to 40% on processing fees immediately</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Link
              href="/"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 px-8 rounded-full text-lg shadow-2xl shadow-yellow-400/25 hover:shadow-yellow-400/40 transition-all duration-300 transform hover:scale-105"
            >
              Back to Homepage
            </Link>
            
            <a
              href="mailto:Save.zummitpayments@gmail.com"
              className="glass border border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center space-x-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <span>Email Us Directly</span>
            </a>
          </div>

          {/* Additional Info */}
          <div className="text-blue-300/70 text-sm space-y-2">
            <p>Questions? Call us at <strong className="text-yellow-400">833.480.7829</strong></p>
            <p>Or email us at <strong className="text-yellow-400">Save.zummitpayments@gmail.com</strong></p>
          </div>

        </div>
      </div>
    </div>
  );
}