'use client';

import { useState } from 'react';
import { supabase, type Lead } from '@/lib/supabase';

export default function GetQuote() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
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
      title: 'Your Merchant Services & Payment Processing Provider ',
      subtitle: 'Unlock your 0% payment processing fees today!',
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
    },
    {
      title: 'Thank You!',
      subtitle: 'We will contact you soon with the best savings options for your business.',
      buttonText: 'Continue to Dashboard',
      isSuccess: true
    }
  ];

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'businessName':
        if (!value.trim()) return 'Business name is required';
        if (value.trim().length < 2) return 'Business name must be at least 2 characters';
        return '';
      case 'firstName':
        if (!value.trim()) return 'First name is required';
        if (value.trim().length < 2) return 'First name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'First name can only contain letters';
        return '';
      case 'lastName':
        if (!value.trim()) return 'Last name is required';
        if (value.trim().length < 2) return 'Last name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'Last name can only contain letters';
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

  const validateCurrentStep = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (currentStep === 3) {
      const error = validateField('businessName', formData.businessName);
      if (error) newErrors.businessName = error;
    } else if (currentStep === 4) {
      const firstNameError = validateField('firstName', formData.firstName);
      const lastNameError = validateField('lastName', formData.lastName);
      if (firstNameError) newErrors.firstName = firstNameError;
      if (lastNameError) newErrors.lastName = lastNameError;
    } else if (currentStep === 5) {
      const phoneError = validateField('phone', formData.phone);
      const emailError = validateField('email', formData.email);
      if (phoneError) newErrors.phone = phoneError;
      if (emailError) newErrors.email = emailError;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNext = async (value?: string) => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep === 1) {
      setFormData(prev => ({ ...prev, businessLocation: value || '' }));
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setFormData(prev => ({ ...prev, processingVolume: value || '' }));
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (validateCurrentStep()) {
        setCurrentStep(4);
      }
    } else if (currentStep === 4) {
      if (validateCurrentStep()) {
        setCurrentStep(5);
      }
    } else if (currentStep === 5) {
      if (!validateCurrentStep()) {
        return;
      }
      // Submit form to Supabase
      setIsSubmitting(true);
      try {
        const leadData: Omit<Lead, 'id' | 'created_at'> = {
          business_location: formData.businessLocation,
          processing_volume: formData.processingVolume,
          business_name: formData.businessName,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          email: formData.email
        };

        const { data, error } = await supabase
          .from('leads')
          .insert([leadData])
          .select();

        if (error) {
          throw error;
        }

        console.log('Lead submitted successfully:', data);
        setCurrentStep(6);
        
        // Auto-redirect after 3 seconds
        setTimeout(() => {
          window.location.href = '/thank-you';
        }, 3000);
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your information. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
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
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your business name *"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className={`w-full p-5 rounded-xl bg-white/95 backdrop-blur text-black text-lg placeholder-gray-500 focus:outline-none focus:ring-4 border shadow-xl transition-all duration-300 ${
                      errors.businessName 
                        ? 'border-red-500 focus:ring-red-400/50' 
                        : 'border-gray-200 focus:ring-yellow-400/50'
                    }`}
                  />
                  {errors.businessName && (
                    <p className="text-red-500 text-sm mt-2 font-medium">{errors.businessName}</p>
                  )}
                </div>
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
                <div className="relative">
                  <input
                    type="text"
                    placeholder="First Name *"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full p-5 rounded-xl bg-white/95 backdrop-blur text-black text-lg placeholder-gray-500 focus:outline-none focus:ring-4 border shadow-xl transition-all duration-300 ${
                      errors.firstName 
                        ? 'border-red-500 focus:ring-red-400/50' 
                        : 'border-gray-200 focus:ring-yellow-400/50'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-2 font-medium">{errors.firstName}</p>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Last Name *"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full p-5 rounded-xl bg-white/95 backdrop-blur text-black text-lg placeholder-gray-500 focus:outline-none focus:ring-4 border shadow-xl transition-all duration-300 ${
                      errors.lastName 
                        ? 'border-red-500 focus:ring-red-400/50' 
                        : 'border-gray-200 focus:ring-yellow-400/50'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-2 font-medium">{errors.lastName}</p>
                  )}
                </div>
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
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full p-5 rounded-xl bg-white/95 backdrop-blur text-black text-lg placeholder-gray-500 focus:outline-none focus:ring-4 border shadow-xl transition-all duration-300 ${
                      errors.phone 
                        ? 'border-red-500 focus:ring-red-400/50' 
                        : 'border-gray-200 focus:ring-yellow-400/50'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-2 font-medium">{errors.phone}</p>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full p-5 rounded-xl bg-white/95 backdrop-blur text-black text-lg placeholder-gray-500 focus:outline-none focus:ring-4 border shadow-xl transition-all duration-300 ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-400/50' 
                        : 'border-gray-200 focus:ring-yellow-400/50'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 font-medium">{errors.email}</p>
                  )}
                </div>
                <button
                  onClick={() => handleNext()}
                  disabled={!formData.phone.trim() || !formData.email.trim() || isSubmitting}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-black font-bold py-5 px-16 rounded-full text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl w-full shadow-xl"
                >
                  {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
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

          {/* Step 6 - Success Page */}
          {currentStep === 6 && (
            <div className="space-y-10">
              <div className="space-y-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center shadow-2xl">
                  <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {steps[6].title}
                </h1>
                <p className="text-blue-100 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
                  {steps[6].subtitle}
                </p>
                <div className="space-y-4 text-blue-200 text-lg">
                  <p>📧 We&apos;ll send you a detailed proposal within 24 hours</p>
                  <p>📞 A payment specialist will call you to discuss your savings</p>
                  <p>💰 Start saving up to 40% on processing fees immediately</p>
                </div>
                <div className="flex items-center justify-center space-x-2 text-yellow-400 text-lg font-semibold mt-8">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse animation-delay-200"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse animation-delay-400"></div>
                  <span className="ml-3">Redirecting...</span>
                </div>
              </div>
              <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full shadow-lg"></div>
              <div className="w-full bg-slate-700 h-3 rounded-full shadow-inner">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500 shadow-lg" 
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}