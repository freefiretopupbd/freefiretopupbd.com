import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SiteSettingsProvider } from '@/context/SiteSettingsContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingAppInstall from '@/components/ui/FloatingAppInstall'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })


export const viewport: Viewport = {
  themeColor: '#ec1a57',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.freefiretopupbd.com'),
  title: {
    template: '%s',
    default: 'Free Fire Top Up BD - Premium Game Top Up & Gift Cards',
  },
  manifest: '/manifest.json',
  description: 'Premium game top-up app in Bangladesh, offering seamless and automatic Bkash, Nagad payments for Free Fire, PUBG, and more.',
  
  authors: [{ name: 'Free Fire Top Up BD' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Free Fire Top Up BD - Premium Game Top Up',
    description: 'Get your game credits instantly! Premium games top up app in Bangladesh with automated delivery.',
    url: '/',
    siteName: 'Free Fire Top Up BD',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col pt-16`}>
        <SiteSettingsProvider>
          <Header />
            <main className="flex-grow w-full h-full relative z-0">
                {children}
            </main>
          <Footer />
          <FloatingAppInstall />
        </SiteSettingsProvider>
      </body>
    </html>
  )
}
