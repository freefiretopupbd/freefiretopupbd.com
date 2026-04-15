"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginContent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    
    const router = useRouter();
    const searchParams = useSearchParams();
    // In App router, useSearchParams replaces useLocation().state
    // Normally we'd use a redirect param, assuming /profile as default.
    const redirectPath = searchParams.get('redirect') || '/profile';

    useEffect(() => {
        localStorage.clear();
        sessionStorage.clear();
    }, []);

    const signIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors([]);
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user_login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const result = await res.json();
            
            if (result.error) {
                setErrors([result.error]);
            } else {
                localStorage.setItem('user-info', JSON.stringify(result));
                // Reload or trigger context update if needed, but App router will just navigate
                window.location.href = redirectPath;
            }
        } catch (error) {
            setErrors(["Failed to login. Please check your connection."]);
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = () => {
        setLoadingGoogle(true);
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
    };

    useEffect(() => {
        const handleGoogleCallback = async () => {
             const code = searchParams.get('email');
             if (!code) return;
             
             try {
                  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/callbacklogin?email=${code}`);
                 const data = await response.json();
                 
                 if (response.ok) {
                     localStorage.setItem('user-info', JSON.stringify(data));
                     window.location.href = '/profile';
                 } else {
                     setErrors([data.error || 'Failed to login with Google.']);
                 }
             } catch (error) {
                 setErrors(['Failed to login with Google. Please try again.']);
             }
        };

        if (searchParams.get('email') && !searchParams.get('name')) { // Only login if name isn't there (differentiates from register callback if they share URL structure)
             handleGoogleCallback();
        }
    }, [searchParams]);

    return (
        <div className="container mx-auto px-4 py-12 md:py-20 flex justify-center min-h-[70vh]">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Welcome Back</h1>
                
                <button
                    type="button"
                    onClick={googleLogin}
                    disabled={loadingGoogle}
                    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-70"
                >
                    <svg width="20" height="20" viewBox="0 0 18 18">
                        <g fill="none" fillRule="evenodd">
                            <path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path>
                            <path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c-1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path>
                            <path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path>
                            <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path>
                        </g>
                    </svg>
                    {loadingGoogle ? "Connecting..." : "Continue with Google"}
                </button>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">or sign in with email</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {errors.length > 0 && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        {errors.map((error, idx) => (
                            <p key={idx} className="text-red-600 text-sm text-center">{error}</p>
                        ))}
                    </div>
                )}

                <form onSubmit={signIn} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-colors"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-colors"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-pink-500/20 transition-all disabled:opacity-70 mt-4"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-600 space-y-2">
                    <p>
                        New Member? <Link href="/register" className="text-pink-600 font-bold hover:underline">Create an account</Link>
                    </p>
                    <p>
                        <Link href="/forgot-password" className="text-gray-500 hover:text-pink-600 transition-colors">Forgot Password?</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <LoginContent />
        </React.Suspense>
    );
}
