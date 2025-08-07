'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Solutions',
      links: [
        { name: 'Credit Card Processing', href: '/products/credit-card' },
        { name: 'Point of Sale Systems', href: '/products/pos' },
        { name: 'E-commerce Solutions', href: '/products/ecommerce' },
        { name: 'Mobile Payments', href: '/products/mobile' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/company' },
        { name: 'Leadership', href: '/company/leadership' },
        { name: 'Careers', href: '/company/careers' },
        { name: 'News & Press', href: '/company/news' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Technical Support', href: '/support/technical' },
        { name: 'Account Management', href: '/support/account' },
        { name: 'Training', href: '/support/training' }
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-neutral-900 to-black border-t border-neutral-800">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Image 
                src="/zummit.png" 
                alt="Zummit Payments Logo" 
                width={48}
                height={48}
                className="object-contain"
              />
              <div>
                <h2 className="text-2xl font-bold text-white">Zummit Payments</h2>
                <p className="text-sm text-neutral-400">Merchant & Payment Processing Services</p>
              </div>
            </div>
            
            <p className="text-neutral-400 mb-6 leading-relaxed">
              Zummit Payments are helping business owners save money so they can pour back into the business and get back to what matters most the clients!
            </p>
            
            <div className="flex items-center space-x-4 mb-6">
              <a href="mailto:Save.zummitpayments@gmail.com" className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <span className="font-semibold">Save.zummitpayments@gmail.com</span>
              </a>
            </div>

            <div className="flex space-x-4">
              <a href="https://www.instagram.com/zummit.payments?igsh=MWd5cDJoYjZrdWh0Zg==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-neutral-800 hover:bg-gradient-to-br hover:from-yellow-400 hover:to-orange-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                <svg className="w-5 h-5 text-neutral-400 group-hover:text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://calendly.com/save-zummitpayments/30min?month=2025-08" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-neutral-800 hover:bg-gradient-to-br hover:from-yellow-400 hover:to-orange-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                <svg className="w-5 h-5 text-neutral-400 group-hover:text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-neutral-400 text-sm">
                © {currentYear} Zummit Payments. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link href="/legal/privacy" className="text-neutral-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/legal/terms" className="text-neutral-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
                <Link href="/legal/cookies" className="text-neutral-400 hover:text-white text-sm transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-breathe"></div>
                <span className="text-neutral-400 text-sm">All systems operational</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-neutral-400 text-sm">PCI DSS Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}