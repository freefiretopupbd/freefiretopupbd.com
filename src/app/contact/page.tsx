import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Us via phone, WhatsApp or Messenger for instant support and assistance in Bangladesh.',
  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: '/contact',
  },

  openGraph: {
    title: 'Contact',
    description: 'Get in touch with us for support and inquiries.',
    
    url: '/contact',
  },
};

export default function Page() {
  return <ContactClient />;
}