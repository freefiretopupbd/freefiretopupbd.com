"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    async function handleForgotPassword(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setErrors([]);
        setMessage("");

        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forgot_password`, {
                method: 'POST',
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({ email })
            });
            const data = await result.json();

            if (data.error) {
                setErrors(Array.isArray(data.error) ? data.error : [data.error]);
            } else {
                setMessage(data.message || "Password reset link sent to your email.");
            }
        } catch (error) {
            console.error("Forgot password error:", error);
            setErrors(["An error occurred. Please try again."]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 relative overflow-hidden">
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-pink-200 rounded-full opacity-20 blur-3xl p-10 z-0"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-violet-200 rounded-full opacity-20 blur-3xl p-10 z-0"></div>

            <div className="max-w-md w-full relative z-10 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-pink-500 to-violet-500 p-8 text-center">
                    <h2 className="text-3xl font-extrabold text-white mb-2">Forgot Password</h2>
                    <p className="text-pink-100 text-sm opacity-90">Enter your email to receive a reset link</p>
                </div>

                <div className="p-8">
                    {errors.length > 0 && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 relative shadow-sm text-sm">
                             <button
                                className="absolute top-2 right-2 text-red-400 hover:text-red-600 focus:outline-none"
                                onClick={() => setErrors([])}
                            >
                                ✕
                            </button>
                            {errors.map((error, idx) => (
                                <p key={idx}>{error}</p>
                            ))}
                        </div>
                    )}
                    
                    {message && (
                        <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-6 shadow-sm text-sm">
                            <p className="font-medium flex items-center gap-2"><span className="text-lg">✓</span> {message}</p>
                        </div>
                    )}

                    <form onSubmit={handleForgotPassword} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-shadow shadow-sm"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all shadow-md hover:shadow-lg disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Sending Link...
                                    </span>
                                ) : "Send Reset Link"}
                            </button>
                        </div>
                    </form>
                </div>
                
                <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-600">
                        Remember your password?{' '}
                        <Link href="/login" className="font-bold text-pink-600 hover:text-pink-500 transition-colors">
                            Back to Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
