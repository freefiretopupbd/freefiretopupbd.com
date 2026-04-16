import type { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account to buy game top-ups.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <LoginClient />;
}