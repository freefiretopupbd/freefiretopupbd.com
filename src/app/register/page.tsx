import type { Metadata } from 'next';
import RegisterClient from './RegisterClient';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create account to buy game top-ups and gift cards.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <RegisterClient />;
}