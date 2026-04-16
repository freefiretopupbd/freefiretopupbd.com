import type { Metadata } from 'next';
import ResetPasswordClient from './ResetPasswordClient';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your account password.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <ResetPasswordClient />;
}