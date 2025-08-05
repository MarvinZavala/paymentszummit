'use client';

import { useState } from 'react';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    businessLocation: '',
    processingVolume: '',
    businessName: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  const steps = [
    {
      title: 'The #1 Ranked Payment Processor',
      subtitle: 'Save Up To 40% On Fees With 0% Markup Processing',
      buttonText: 'Get Started'
    },
    {
      title: 'Is your business based in the United States?',
      options: ['Yes', 'No']
    },
    {
      title: 'What is your monthly processing volume?',
      options: ['< $5k', '$5k - $25k', '$25k - $50k', '$50k - $100k', '$100k - $200k', '$200k+']
    },
    {
      title: 'Please write your business name',
      isInput: true,
      inputType: 'text',
      placeholder: 'Business Name'
    },
    {
      title: 'Please write your full name',
      isInput: true,
      inputType: 'name',
      fields: ['First Name', 'Last Name']
    },
    {
      title: 'Please provide your contact information',
      isInput: true,
      inputType: 'contact',
      fields: ['Phone Number', 'Email Address']
    }
  ];

  const handleNext = (value?: string) => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep === 1) {
      setFormData(prev => ({ ...prev, businessLocation: value || '' }));
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setFormData(prev => ({ ...prev, processingVolume: value || '' }));
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setFormData(prev => ({ ...prev, businessName: value || '' }));
      setCurrentStep(4);
    } else if (currentStep === 4) {
      setCurrentStep(5);
    } else if (currentStep === 5) {
      // Final step - submit form and redirect to dashboard
      console.log('Form submitted:', formData);
      // Redirect to dashboard after form completion
      window.location.href = '/dashboard';
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Modal Container */}
      <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 w-full max-w-2xl mx-auto relative z-10">
        {/* Close Button */}
        <button className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-light transition-colors duration-200 hover:rotate-90 transform">
          ×
        </button>

        {/* Content */}
        <div className="p-8 md:p-12 text-center">
          {/* Step 0 - Welcome */}
          {currentStep === 0 && (
            <div className="space-y-10">
              <div className="space-y-6">
                <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {steps[0].title}
                </h1>
                <p className="text-blue-100 text-xl md:text-2xl font-medium leading-relaxed">
                  {steps[0].subtitle}
                </p>
              </div>
              <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full shadow-lg"></div>
              <button
                onClick={() => handleNext()}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-bold py-5 px-16 rounded-full text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl w-full max-w-md shadow-xl"
              >
                {steps[0].buttonText}
              </button>
            </div>
          )}

          {/* Step 1 & 2 - Options */}
          {(currentStep === 1 || currentStep === 2) && (
            <div className="space-y-10">
              <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                {steps[currentStep].title}
              </h2>
              <div className="space-y-4">
                {steps[currentStep].options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleNext(option)}
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-bold py-5 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl w-full shadow-lg"
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="w-full bg-slate-700 h-3 rounded-full mt-10 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500 shadow-lg" 
                  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="text-blue-200 hover:text-white mt-6 flex items-center justify-center mx-auto transition-colors duration-200 font-medium"
                >
                  ← Back
                </button>
              )}
            </div>
          )}

          {/* Step 3 - Business Name Input */}
          {currentStep === 3 && (
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {steps[3].title}
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full shadow-lg"></div>
              </div>
              <div className="space-y-8">
                <input
                  type="text"
                  placeholder="Enter your business name"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="w-full p-5 rounded-xl bg-white/95 backdrop-blur text-black text-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 border border-gray-200 shadow-xl transition-all duration-300"
                />
                <button
                  onClick={() => handleNext(formData.businessName)}
                  disabled={!formData.businessName.trim()}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-black font-bold py-5 px-16 rounded-full text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl w-full shadow-xl"
                >
                  CONTINUE
                </button>
              </div>
              <div className="w-full bg-slate-700 h-3 rounded-full shadow-inner">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500 shadow-lg" 
                  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>
              <button
                onClick={handleBack}
                className="text-blue-200 hover:text-white flex items-center justify-center mx-auto transition-colors duration-200 font-medium"
              >
                ← Back
              </button>
            </div>
          )}

          {/* Step 4 - Full Name Input */}
          {currentStep === 4 && (
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {steps[4].title}
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full shadow-lg"></div>
              </div>
              <div className="space-y-8">
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full p-5 rounded-xl bg-white/95 backdrop-blur text-black text-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 border border-gray-200 shadow-xl transition-all duration-300"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full p-5 rounded-xl bg-white/95 backdrop-blur text-black text-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 border border-gray-200 shadow-xl transition-all duration-300"
                />
                <button
                  onClick={() => handleNext()}
                  disabled={!formData.firstName.trim() || !formData.lastName.trim()}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-black font-bold py-5 px-16 rounded-full text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl w-full shadow-xl"
                >
                  CONTINUE
                </button>
              </div>
              <div className="w-full bg-slate-700 h-3 rounded-full shadow-inner">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500 shadow-lg" 
                  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>
              <button
                onClick={handleBack}
                className="text-blue-200 hover:text-white flex items-center justify-center mx-auto transition-colors duration-200 font-medium"
              >
                ← Back
              </button>
            </div>
          )}

          {/* Step 5 - Contact Information Input */}
          {currentStep === 5 && (
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {steps[5].title}
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full shadow-lg"></div>
              </div>
              <div className="space-y-8">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full p-5 rounded-xl bg-white/95 backdrop-blur text-black text-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 border border-gray-200 shadow-xl transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full p-5 rounded-xl bg-white/95 backdrop-blur text-black text-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 border border-gray-200 shadow-xl transition-all duration-300"
                />
                <button
                  onClick={() => handleNext()}
                  disabled={!formData.phone.trim() || !formData.email.trim()}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-black font-bold py-5 px-16 rounded-full text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl w-full shadow-xl"
                >
                  SUBMIT
                </button>
              </div>
              <div className="w-full bg-slate-700 h-3 rounded-full shadow-inner">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500 shadow-lg" 
                  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>
              <button
                onClick={handleBack}
                className="text-blue-200 hover:text-white flex items-center justify-center mx-auto transition-colors duration-200 font-medium"
              >
                ← Back
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Chat Widget */}
      <div className="fixed bottom-6 right-6 z-20">
        <div className="bg-white rounded-full p-4 shadow-2xl border-4 border-yellow-400 hover:scale-110 transition-transform duration-300 cursor-pointer">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center relative">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Chat Message */}
      <div className="fixed bottom-24 right-6 bg-white rounded-2xl p-6 shadow-2xl max-w-sm border border-gray-200 z-20">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-800 leading-relaxed">
              <span className="font-semibold text-blue-600">Looking to save 40% on your credit card processing?</span> Chat live with one of our payment experts now! Call us at{' '}
              
            </p>
          </div>
        </div>
        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-200"></div>
      </div>
    </div>
  );
}
