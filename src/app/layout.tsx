import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zummit Payments",
  description: "Professional payment solutions for your business",
  icons: {
    icon: [
      {
        url: '/icon-16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/icon-32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/icon.png',
        sizes: '1024x1024',
        type: 'image/png',
      },
    ],
    shortcut: '/icon-32.png',
    apple: {
      url: '/icon.png',
      sizes: '1024x1024',
      type: 'image/png',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        
        {/* Hidden Google Translate Element */}
        <div id="google_translate_element" style={{ display: 'none' }}></div>
        
        <Analytics />
        
        {/* Google Translate Script */}
        <Script
          id="google-translate-script"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                if (typeof google !== 'undefined' && google.translate && google.translate.TranslateElement) {
                  new google.translate.TranslateElement({
                    pageLanguage: 'en',
                    includedLanguages: 'en,es,pt,fr,it,de',
                    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false,
                    multilanguagePage: true
                  }, 'google_translate_element');
                }
              }
            `
          }}
        />
        
        {/* Tawk.to Live Chat Script */}
        <Script
          id="tawk-to-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/68928822205309192bd922e1/1j1u67i28';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `
          }}
        />
      </body>
    </html>
  );
}
